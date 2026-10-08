import type { Event } from '../../types';
import { Card, Button } from '../common';
import { Ticket, Clock, DollarSign, Users, MapPin } from 'lucide-react';
import { formatCurrency, formatDate, formatTime, calculateDuration } from '../../utils/formatters';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  onBook: (event: Event) => void;
}

/** Displays a single event (concert, conference, or sporting event) with booking action. */
export const EventCard = ({ event, onBook }: EventCardProps) => {
  const isLowTickets = event.tickets_available <= 2;
  const isSoldOut = event.tickets_available === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col">
        {/* Event Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
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
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-6 flex-1">
          {/* Venue */}
          <div className="flex items-center gap-2 text-star-white/70">
            <MapPin size={16} className="text-cosmic-purple" />
            <span className="text-sm font-medium text-star-white">
              {event.destination}
            </span>
          </div>

          {/* Doors Open & End Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-star-white/60 mb-1">Doors Open</p>
              <p className="text-sm font-medium text-star-white">
                {formatDate(event.departure_time, 'MMM dd, yyyy')}
              </p>
              <p className="text-lg font-bold text-cosmic-purple">
                {formatTime(event.departure_time)}
              </p>
            </div>
            <div>
              <p className="text-xs text-star-white/60 mb-1">Event End</p>
              <p className="text-sm font-medium text-star-white">
                {formatDate(event.arrival_time, 'MMM dd, yyyy')}
              </p>
              <p className="text-lg font-bold text-cosmic-purple">
                {formatTime(event.arrival_time)}
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-star-white/70">
            <Clock size={16} />
            <span className="text-sm">
              Duration: {calculateDuration(event.departure_time, event.arrival_time)}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-alien-green" />
            <span className="text-2xl font-bold text-star-white">
              {formatCurrency(event.price)}
            </span>
            <span className="text-sm text-star-white/60">per ticket</span>
          </div>

          {/* Tickets Available */}
          <div className="flex items-center gap-2">
            <Users size={16} className={isLowTickets ? 'text-solar-orange' : 'text-star-white/70'} />
            <span className={`text-sm ${isLowTickets ? 'text-solar-orange font-semibold' : 'text-star-white/70'}`}>
              {isSoldOut ? 'Sold Out' : `${event.tickets_available} tickets left`}
            </span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          onClick={() => onBook(event)}
          disabled={isSoldOut}
          className="w-full"
        >
          {isSoldOut ? 'Sold Out' : 'Get Tickets'}
        </Button>
      </Card>
    </motion.div>
  );
};

// Made with Bob
