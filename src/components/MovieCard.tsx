import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/lib/api';

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export function MovieCard({ movie, index }: MovieCardProps) {
  const minPrice = Math.min(...movie.shows.map((s) => s.pricePerSeat));
  const totalSeats = movie.shows.reduce((sum, s) => sum + s.availableSeats, 0);

  return (
    <Link to={`/movies/${movie.id}`}>
      <Card 
        className="group h-full glass glow-sm hover:glow transition-all duration-300 animate-fade-in cursor-pointer overflow-hidden"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl group-hover:text-gradient transition-colors line-clamp-1">
              {movie.title}
            </CardTitle>
            <Badge variant="secondary" className="shrink-0">
              {movie.genre}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{movie.duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              <span>From ₹{minPrice}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {movie.shows.slice(0, 3).map((show) => (
              <Badge 
                key={show.showId} 
                variant="outline" 
                className="text-xs"
              >
                {show.time}
              </Badge>
            ))}
            {movie.shows.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{movie.shows.length - 3} more
              </Badge>
            )}
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {totalSeats} seats available across {movie.shows.length} shows
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
