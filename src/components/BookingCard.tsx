import { Calendar, Clock, Users, IndianRupee, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Booking } from '@/lib/api';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: number) => void;
  isLoading?: boolean;
}

export function BookingCard({ booking, onCancel, isLoading }: BookingCardProps) {
  const isConfirmed = booking.status === 'confirmed';
  const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card className={`glass glow-sm animate-fade-in ${!isConfirmed ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{booking.movieTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Booking #{booking.bookingId}
            </p>
          </div>
          <Badge variant={isConfirmed ? 'default' : 'secondary'}>
            {booking.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{booking.showTime}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{bookingDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{booking.seats} seat{booking.seats > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <IndianRupee className="h-4 w-4" />
            <span>{booking.totalAmount}</span>
          </div>
        </div>

        {isConfirmed && onCancel && (
          <Button
            variant="destructive"
            size="sm"
            className="w-full gap-2"
            onClick={() => onCancel(booking.bookingId)}
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
            Cancel Booking
          </Button>
        )}

        {!isConfirmed && booking.cancelledAt && (
          <p className="text-xs text-muted-foreground text-center">
            Cancelled on {new Date(booking.cancelledAt).toLocaleDateString('en-IN')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
