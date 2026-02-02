import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  IndianRupee, 
  Users, 
  XCircle,
  Loader2 
} from 'lucide-react';
import { getSummary, UserSummary } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType; 
  description?: string;
}) {
  return (
    <Card className="glass glow-sm animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [summary, setSummary] = useState<UserSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchSummary = async () => {
      const { data, error } = await getSummary();
      
      if (error) {
        toast({
          title: 'Error loading dashboard',
          description: error,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      if (data) {
        setSummary(data);
      }
      setIsLoading(false);
    };

    fetchSummary();
  }, [isAuthenticated, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.username || summary?.username}
          </p>
        </div>

        {summary ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Bookings"
              value={summary.totalBookings}
              icon={Ticket}
              description="All time bookings"
            />
            <StatCard
              title="Amount Spent"
              value={`₹${summary.totalAmountSpent.toLocaleString()}`}
              icon={IndianRupee}
              description="On confirmed bookings"
            />
            <StatCard
              title="Seats Booked"
              value={summary.totalSeatsBooked}
              icon={Users}
              description="Active reservations"
            />
            <StatCard
              title="Cancelled"
              value={summary.cancelledBookings}
              icon={XCircle}
              description={`${summary.confirmedBookings} confirmed`}
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <LayoutDashboard className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-medium mb-2">No data yet</h2>
            <p className="text-muted-foreground">
              Book your first movie ticket to see your stats
            </p>
          </div>
        )}

        {summary && summary.totalBookings > 0 && (
          <div className="mt-8 animate-slide-up">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Confirmed Bookings</span>
                    <span className="font-medium text-foreground">{summary.confirmedBookings}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Cancelled Bookings</span>
                    <span className="font-medium text-destructive">{summary.cancelledBookings}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Total Seats Reserved</span>
                    <span className="font-medium">{summary.totalSeatsBooked}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="font-bold text-lg">₹{summary.totalAmountSpent.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
