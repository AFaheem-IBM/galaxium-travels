import type { Booking, Event } from '../../types';
import { Card, Button } from '../common';
import { Ticket, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { motion } from 'framer-motion';

interface BookingCardProps {
  booking: Booking;
  event?: Event;
  onCancel: (bookingId: number) => void;
  isCancelling?: boolean;
}

/** Displays a single booked ticket with its event details and cancellation option. */
export const BookingCard = ({ booking, event, onCancel, isCancelling }: BookingCardProps) => {
  const getStatusIcon = () => {
    switch (booking.status) {
      case 'booked':
        return <CheckCircle className="text-alien-green" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      case 'completed':
        return <CheckCircle className="text-blue-500" size={20} />;
      default:
        return <Clock className="text-star-white/50" size={20} />;
    }
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case 'booked':
        return 'text-alien-green';
      case 'cancelled':
        return 'text-red-500';
      case 'completed':
        return 'text-blue-500';
      default:
        return 'text-star-white/50';
    }
  };

  const canCancel = booking.status === 'booked';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        {/* Header */}
        <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cosmic-gradient">
              <Ticket className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-star-white/60">Ticket #{booking.booking_id}</p>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon()}
                <span className={`text-sm font-semibold capitalize ${getStatusColor()}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        {event ? (
          <div className="space-y-3 mb-4">
            <div>
              <h3 className="text-xl font-bold text-star-white mb-1">
                {event.origin}
              </h3>
              <p className="text-sm text-star-white/60">@ {event.destination}</p>
              <p className="text-xs text-star-white/40">Event #{event.event_id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-star-white/60 mb-1">Doors Open</p>
                <p className="text-sm text-star-white font-medium">
                  {formatDate(event.departure_time)}
                </p>
              </div>
              <div>
                <p className="text-xs text-star-white/60 mb-1">Event End</p>
                <p className="text-sm text-star-white font-medium">
                  {formatDate(event.arrival_time)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-sm text-star-white/60">Ticket Price</span>
              <span className="text-lg font-bold text-star-white">
                {formatCurrency(event.price)}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-sm text-star-white/60">Event ID: {booking.event_id}</p>
          </div>
        )}

        {/* Booking Time */}
        <div className="flex items-center gap-2 text-sm text-star-white/60 mb-4">
          <Calendar size={16} />
          <span>Purchased on {formatDate(booking.booking_time)}</span>
        </div>

        {/* Cancel Button */}
        {canCancel && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onCancel(booking.booking_id)}
            isLoading={isCancelling}
            className="w-full"
          >
            Cancel Ticket
          </Button>
        )}
      </Card>
    </motion.div>
  );
};

// Made with Bob
