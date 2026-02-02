import { useEffect, useState } from 'react';
import { Film, Loader2 } from 'lucide-react';
import { getMovies, Movie } from '@/lib/api';
import { MovieCard } from '@/components/MovieCard';
import { Header } from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMovies = async () => {
      const { data, error } = await getMovies();
      
      if (error) {
        toast({
          title: 'Error loading movies',
          description: error,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      if (data) {
        setMovies(data.movies);
      }
      setIsLoading(false);
    };

    fetchMovies();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Now Showing</h1>
          <p className="text-muted-foreground">
            Browse and book tickets for the latest movies
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <Film className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-medium mb-2">No movies available</h2>
            <p className="text-muted-foreground">Check back later for new releases</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
