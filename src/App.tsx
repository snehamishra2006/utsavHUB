import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { EventCard } from './components/EventCard';
import { MapView } from './components/MapView';
import { ViewToggle } from './components/ViewToggle';
import { AuthModal } from './components/AuthModal';
import { PaymentModal } from './components/PaymentModal';
import { mockEvents } from './data/mockEvents';
import { ShoppingCart, ArrowRight, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState('all');

  const localities = useMemo(() => {
    const uniqueLocalities = Array.from(new Set(mockEvents.map(e => e.locality)));
    return ['all', ...uniqueLocalities];
  }, []);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const categoryMatch = activeCategory === 'all' || event.category === activeCategory;
      const freeMatch = !showFreeOnly || event.price === null;
      const localityMatch = selectedLocality === 'all' || event.locality === selectedLocality;
      return categoryMatch && freeMatch && localityMatch;
    });
  }, [activeCategory, showFreeOnly, selectedLocality]);

  const handleRSVP = () => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
    } else {
      setIsPaymentOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />
      <CategoryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Filters & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {activeCategory === 'all' ? 'Discover Utsavs' : `${activeCategory} Events`}
              </h2>
              {isAuthenticated && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              )}
            </div>
            <p className="text-slate-500 font-medium">
              Explore {filteredEvents.length} handpicked experiences in your city.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Free Entry Toggle */}
            <button
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all border shadow-sm",
                showFreeOnly 
                  ? "bg-emerald-500 text-white border-emerald-500" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              )}
            >
              <Sparkles className={cn("w-4 h-4", showFreeOnly ? "text-white" : "text-emerald-500")} />
              <span>Free Entry</span>
            </button>

            {/* Locality Filter */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:border-slate-300 transition-all shadow-sm">
                <Filter className="w-4 h-4 text-primary" />
                <span>{selectedLocality === 'all' ? 'All Localities' : selectedLocality}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                {localities.map(loc => (
                  <button 
                    key={loc}
                    onClick={() => setSelectedLocality(loc)}
                    className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                  >
                    {loc === 'all' ? 'All Localities' : loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MapView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating View Toggle */}
      <ViewToggle view={view} onViewChange={setView} />

      {/* Sticky RSVP Button for Mobile */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-40">
        <button 
          onClick={handleRSVP}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
        >
          <span>Book Tickets</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={() => setIsAuthenticated(true)}
      />
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        eventTitle="Grand Wedding Expo 2026"
        price={200}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-black text-xl">U</span>
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">UtsavHub</span>
            </div>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
              India's most trusted platform for local event discovery. From grand weddings to tech meetups, find your next utsav here.
            </p>
            <div className="mt-8 flex gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Play Store" className="h-10" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="h-10" />
            </div>
          </div>
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Popular Cities</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Free Workshops</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Religious Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Comedy Shows</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2026 UtsavHub India Pvt Ltd. Made with ❤️ in Bangalore.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
