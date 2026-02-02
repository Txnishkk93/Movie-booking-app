import { Clock, Users, IndianRupee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Show } from '@/lib/api';

interface ShowCardProps {
  show: Show;
  onSelect: (show: Show) => void;
  isSelected: boolean;
}

export function ShowCard({ show, onSelect, isSelected }: ShowCardProps) {
  const isLowSeats = show.availableSeats < 10;
  const isSoldOut = show.availableSeats === 0;

  return (
    <Card 
      className={`glass transition-all duration-300 cursor-pointer ${
        isSelected ? 'ring-2 ring-foreground glow' : 'hover:glow-sm'
      } ${isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !isSoldOut && onSelect(show)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{show.time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{show.pricePerSeat}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className={isLowSeats ? 'text-destructive font-medium' : ''}>
                {show.availableSeats} seats
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLowSeats && !isSoldOut && (
              <Badge variant="destructive" className="text-xs">
                Filling Fast
              </Badge>
            )}
            {isSoldOut && (
              <Badge variant="secondary" className="text-xs">
                Sold Out
              </Badge>
            )}
            {!isSoldOut && (
              <Button 
                size="sm" 
                variant={isSelected ? 'default' : 'outline'}
                className="transition-all"
              >
                {isSelected ? 'Selected' : 'Select'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
