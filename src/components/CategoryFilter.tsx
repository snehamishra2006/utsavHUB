import React from 'react';
import { Music, Cpu, Trophy, Utensils, Palette, Heart, Sparkles, Gem, Church, Mic2 } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  { id: 'all', name: 'All', icon: Sparkles },
  { id: 'Exhibitions', name: 'Weddings', icon: Gem },
  { id: 'Religious', name: 'Religious', icon: Church },
  { id: 'Tech', name: 'Tech', icon: Cpu },
  { id: 'Sports', name: 'Cricket', icon: Trophy },
  { id: 'Comedy', name: 'Comedy', icon: Mic2 },
  { id: 'Food', name: 'Food', icon: Utensils },
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="w-full bg-white border-b border-slate-100 py-4 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "flex flex-col items-center gap-2 min-w-fit transition-all duration-200 group",
                isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
              )}
            >
              <div className={cn(
                "p-2 rounded-full transition-all",
                isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-900"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-900"
              )}>
                {cat.name}
              </span>
              <div className={cn(
                "h-0.5 w-full rounded-full transition-all",
                isActive ? "bg-primary scale-x-100" : "bg-transparent scale-x-0"
              )} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
