import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Loader2 } from 'lucide-react';
import { getBookings, cancelBooking, Booking } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { BookingCard } from '@/components/BookingCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Bookings() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      const { data, error } = await getBookings();
      
      if (error) {
        toast({
          title: 'Error loading bookings',
          description: error,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      if (data) {
        setBookings(data.bookings);
      }
      setIsLoading(false);
    };

    fetchBookings();
  }, [isAuthenticated, navigate, toast]);

  const handleCancel = async (bookingId: number) => {
    setCancellingId(bookingId);
    setBookingToCancel(null);

    const { data, error } = await cancelBooking(bookingId);

    if (error) {
      toast({
        title: 'Cancel failed',
        description: error,
        variant: 'destructive',
      });
      setCancellingId(null);
      return;
    }

    if (data) {
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId
            ? { ...b, status: 'cancelled' as const, cancelledAt: new Date().toISOString() }
            : b
        )
      );
      toast({
        title: 'Booking cancelled',
        description: `Refund of ₹${data.refundAmount} will be processed`,
      });
    }

    setCancellingId(null);
  };

  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your movie ticket bookings
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <Ticket className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-medium mb-2">No bookings yet</h2>
            <p className="text-muted-foreground mb-6">
              Browse movies and book your first ticket
            </p>
            <Button onClick={() => navigate('/movies')}>Browse Movies</Button>
          </div>
        ) : (
          <div className="space-y-8">
            {confirmedBookings.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Active Bookings ({confirmedBookings.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {confirmedBookings.map((booking) => (
                    <BookingCard
                      key={booking.bookingId}
                      booking={booking}
                      onCancel={() => setBookingToCancel(booking.bookingId)}
                      isLoading={cancellingId === booking.bookingId}
                    />
                  ))}
                </div>
              </section>
            )}

            {cancelledBookings.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 text-muted-foreground">
                  Cancelled ({cancelledBookings.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cancelledBookings.map((booking) => (
                    <BookingCard key={booking.bookingId} booking={booking} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <AlertDialog open={!!bookingToCancel} onOpenChange={() => setBookingToCancel(null)}>
        <AlertDialogContent className="glass">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? Your refund will be processed shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => bookingToCancel && handleCancel(bookingToCancel)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
