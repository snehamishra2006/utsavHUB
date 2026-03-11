import React from 'react';
import { LayoutGrid, Map as MapIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface ViewToggleProps {
  view: 'grid' | 'map';
  onViewChange: (view: 'grid' | 'map') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white rounded-full p-1 shadow-2xl flex items-center gap-1">
      <button
        onClick={() => onViewChange('grid')}
        className={cn(
          "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all",
          view === 'grid' ? "bg-white text-slate-900" : "hover:bg-white/10"
        )}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>List</span>
      </button>
      <button
        onClick={() => onViewChange('map')}
        className={cn(
          "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all",
          view === 'map' ? "bg-white text-slate-900" : "hover:bg-white/10"
        )}
      >
        <MapIcon className="w-4 h-4" />
        <span>Map</span>
      </button>
    </div>
  );
};
