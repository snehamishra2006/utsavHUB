import React from 'react';
import { Map as MapIcon, Info } from 'lucide-react';

export const MapView: React.FC = () => {
  return (
    <div className="w-full h-[calc(100vh-200px)] bg-slate-100 rounded-3xl relative overflow-hidden border border-slate-200">
      {/* Styled Placeholder for Map */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
            <MapIcon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Interactive Map View</h2>
          <p className="text-slate-500 mb-6">
            Explore events in your neighborhood. Zoom in to see precise locations and venues.
          </p>
          <div className="flex items-center gap-2 justify-center p-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium">
            <Info className="w-4 h-4" />
            <span>Map API integration placeholder</span>
          </div>
        </div>
      </div>

      {/* Mock Map Markers */}
      <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg animate-bounce" />
      <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg animate-bounce [animation-delay:0.2s]" />
      <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg animate-bounce [animation-delay:0.4s]" />
    </div>
  );
};
