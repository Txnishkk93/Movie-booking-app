import { Link } from 'react-router-dom';
import { Film, Ticket, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-foreground/5 via-transparent to-transparent" />
        
        {/* Hero section */}
        <section className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Film className="h-4 w-4" />
              <span className="text-sm">Book tickets in seconds</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Your gateway to
              <span className="block text-gradient">cinema magic</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Browse the latest movies, choose your favorite showtimes, 
              and book tickets instantly. Simple, fast, seamless.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/movies">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Browse Movies
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative container mx-auto px-4 py-16 border-t border-border">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center animate-slide-up" style={{ animationDelay: '0ms' }}>
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4">
                <Film className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Latest Movies</h3>
              <p className="text-sm text-muted-foreground">
                Browse through our curated selection of the latest blockbusters and classics
              </p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Easy Booking</h3>
              <p className="text-sm text-muted-foreground">
                Select your seats, choose your showtime, and book in just a few clicks
              </p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Track History</h3>
              <p className="text-sm text-muted-foreground">
                View all your bookings, manage reservations, and track your cinema journey
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
