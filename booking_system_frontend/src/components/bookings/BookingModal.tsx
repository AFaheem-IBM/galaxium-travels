import { useState } from 'react';
import type { Event } from '../../types';
import { Modal, Button } from '../common';
import { Ticket, Calendar, Clock, DollarSign, MapPin } from 'lucide-react';
import { formatCurrency, formatDate, calculateDuration } from '../../utils/formatters';
import { bookTicket, isErrorResponse } from '../../services/api';
import { useUser } from '../../hooks/useUser';
import toast from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onSuccess: () => void;
}

/** Confirmation modal shown before a ticket purchase is finalised. */
export const BookingModal = ({ isOpen, onClose, event, onSuccess }: BookingModalProps) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  if (!event) return null;

  const handleConfirmBooking = async () => {
    if (!user) {
      toast.error('Please sign in to purchase tickets');
      return;
    }

    setIsLoading(true);

    try {
      const result = await bookTicket({
        user_id: user.user_id,
        name: user.name,
        event_id: event.event_id,
      });

      if (isErrorResponse(result)) {
        toast.error(result.details || result.error);
        return;
      }

      toast.success('Ticket booked successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.details || error.error || 'Failed to purchase ticket');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Your Ticket"
      size="md"
    >
      <div className="space-y-6">
        {/* Event Summary */}
        <div className="glass-card p-4 bg-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cosmic-gradient">
              <Ticket className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-star-white">
                {event.origin}
              </h3>
              <p className="text-sm text-star-white/60">
                Event #{event.event_id}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Venue */}
            <div className="flex items-start gap-3">
              <MapPin className="text-cosmic-purple mt-1" size={20} />
              <div>
                <p className="text-xs text-star-white/60">Venue</p>
                <p className="text-star-white font-medium">{event.destination}</p>
              </div>
            </div>

            {/* Doors Open */}
            <div className="flex items-start gap-3">
              <Calendar className="text-cosmic-purple mt-1" size={20} />
              <div>
                <p className="text-xs text-star-white/60">Doors Open</p>
                <p className="text-star-white font-medium">
                  {formatDate(event.departure_time)}
                </p>
              </div>
            </div>

            {/* Event End */}
            <div className="flex items-start gap-3">
              <Calendar className="text-cosmic-purple mt-1" size={20} />
              <div>
                <p className="text-xs text-star-white/60">Event End</p>
                <p className="text-star-white font-medium">
                  {formatDate(event.arrival_time)}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-start gap-3">
              <Clock className="text-cosmic-purple mt-1" size={20} />
              <div>
                <p className="text-xs text-star-white/60">Duration</p>
                <p className="text-star-white font-medium">
                  {calculateDuration(event.departure_time, event.arrival_time)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendee Info */}
        {user && (
          <div className="glass-card p-4 bg-white/5">
            <h4 className="text-sm font-semibold text-star-white mb-2">
              Attendee Information
            </h4>
            <p className="text-star-white">{user.name}</p>
            <p className="text-star-white/60 text-sm">{user.email}</p>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between p-4 glass-card bg-cosmic-gradient">
          <div className="flex items-center gap-2">
            <DollarSign className="text-white" size={24} />
            <span className="text-white font-semibold">Total Price</span>
          </div>
          <span className="text-2xl font-bold text-white">
            {formatCurrency(event.price)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmBooking}
            isLoading={isLoading}
            className="flex-1"
          >
            Confirm Purchase
          </Button>
        </div>

        <p className="text-xs text-star-white/60 text-center">
          By confirming, you agree to our terms and conditions
        </p>
      </div>
    </Modal>
  );
};

// Made with Bob
