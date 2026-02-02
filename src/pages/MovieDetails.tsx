import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Loader2, Minus, Plus, Ticket } from 'lucide-react';
import { getMovieShows, createBooking, Movie, Show } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { ShowCard } from '@/components/ShowCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [seats, setSeats] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      
      const { data, error } = await getMovieShows(parseInt(movieId));
      
      if (error) {
        toast({
          title: 'Error loading movie',
          description: error,
          variant: 'destructive',
        });
        navigate('/movies');
        return;
      }

      if (data) {
        setMovie(data);
      }
      setIsLoading(false);
    };

    fetchMovie();
  }, [movieId, navigate, toast]);

  const handleBook = async () => {
    if (!selectedShow || !movie) return;

    if (!isAuthenticated) {
      toast({
        title: 'Please login',
        description: 'You need to be logged in to book tickets',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    setIsBooking(true);

    const { data, error } = await createBooking(movie.id, selectedShow.showId, seats);

    if (error) {
      toast({
        title: 'Booking failed',
        description: error,
        variant: 'destructive',
      });
      setIsBooking(false);
      return;
    }

    if (data) {
      toast({
        title: 'Booking successful!',
        description: `Booked ${seats} seat(s) for ${movie.title}`,
      });
      navigate('/bookings');
    }

    setIsBooking(false);
  };

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

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Movie not found</p>
        </div>
      </div>
    );
  }

  const totalAmount = selectedShow ? seats * selectedShow.pricePerSeat : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate('/movies')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to movies
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fade-in">
              <div className="flex items-start gap-4 mb-4">
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <Badge variant="secondary" className="mt-1">
                  {movie.genre}
                </Badge>
              </div>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>
                    From ₹{Math.min(...movie.shows.map((s) => s.pricePerSeat))}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 animate-slide-up">
              <h2 className="text-xl font-semibold">Select a Show</h2>
              {movie.shows.map((show) => (
                <ShowCard
                  key={show.showId}
                  show={show}
                  onSelect={setSelectedShow}
                  isSelected={selectedShow?.showId === show.showId}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="glass glow sticky top-24 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedShow ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Movie</span>
                        <span className="font-medium">{movie.title}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Show Time</span>
                        <span className="font-medium">{selectedShow.time}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price per seat</span>
                        <span className="font-medium">₹{selectedShow.pricePerSeat}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <label className="text-sm text-muted-foreground block mb-3">
                        Number of Seats (max 10)
                      </label>
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSeats(Math.max(1, seats - 1))}
                          disabled={seats <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-2xl font-bold w-12 text-center">
                          {seats}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSeats(Math.min(10, seats + 1, selectedShow.availableSeats))}
                          disabled={seats >= 10 || seats >= selectedShow.availableSeats}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleBook}
                      disabled={isBooking}
                    >
                      {isBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isAuthenticated ? 'Confirm Booking' : 'Login to Book'}
                    </Button>
                  </>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Select a show time to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
