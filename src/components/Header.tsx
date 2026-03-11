import React, { useState } from 'react';
import { Search, MapPin, Navigation, Globe, ChevronDown } from 'lucide-react';

const cities = ['Bangalore', 'Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];

export const Header: React.FC = () => {
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Location detected:', position.coords);
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo & Language */}
        <div className="flex items-center justify-between md:justify-start gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Navigation className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">UtsavHub</h1>
          </div>
          
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{language === 'EN' ? 'ENGLISH' : 'हिन्दी'}</span>
          </button>
        </div>

        {/* Search & Location */}
        <div className="flex flex-1 max-w-3xl items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search weddings, satsangs, cricket..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">{selectedCity}</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              {cities.map(city => (
                <button 
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile / Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">List Your Event</button>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden cursor-pointer">
            <img src="https://picsum.photos/seed/user/100/100" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};
