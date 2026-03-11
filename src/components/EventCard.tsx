import React from 'react';
import { Calendar, MapPin, Users, Heart, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Event } from '../data/mockEvents';
import { cn } from '../lib/utils';

interface EventCardProps {
  event: Event;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const shareOnWhatsApp = () => {
    const text = `Hey! Check out this event on UtsavHub: ${event.title} at ${event.locality}, ${event.city} on ${event.date}. Join me! ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md",
            event.price === null 
              ? "bg-emerald-500/90 text-white" 
              : "bg-white/90 text-slate-900"
          )}>
            {event.price === null ? 'FREE ENTRY' : `₹${event.price}`}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-rose-500 transition-all shadow-sm">
            <Heart className="w-5 h-5" />
          </button>
          <button 
            onClick={shareOnWhatsApp}
            className="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg"
          >
            <WhatsAppIcon />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          <span>{event.category}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{event.date}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
          <MapPin className="w-4 h-4 shrink-0 text-primary/60" />
          <span className="line-clamp-1">{event.locality}, {event.city}</span>
        </div>

        {/* Social Proof Footer */}
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://picsum.photos/seed/avatar-${i}/50/50`} alt="Avatar" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <Users className="w-2.5 h-2.5" />
              <span>{event.attendees}+ interested</span>
            </div>
          </div>
          
          <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};
