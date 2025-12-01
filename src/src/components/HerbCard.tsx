import React from 'react';
import { Heart, AlertTriangle, Check, Info } from 'lucide-react';
import { Herb } from '../data/herbsData';

interface HerbCardProps {
  herb: Herb;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onViewDetails: (herb: Herb) => void;
}

const HerbCard: React.FC<HerbCardProps> = ({ herb, isFavorite, onToggleFavorite, onViewDetails }) => {
  const getToxicityColor = (toxicity: string) => {
    switch (toxicity) {
      case 'safe': return 'bg-green-100 text-green-700';
      case 'caution': return 'bg-amber-100 text-amber-700';
      case 'toxic': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getToxicityIcon = (toxicity: string) => {
    switch (toxicity) {
      case 'safe': return <Check className="w-3 h-3" />;
      case 'caution': return <AlertTriangle className="w-3 h-3" />;
      case 'toxic': return <AlertTriangle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img
          src={herb.image}
          alt={herb.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(herb.id); }}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getToxicityColor(herb.toxicity)}`}>
          {getToxicityIcon(herb.toxicity)}
          {herb.toxicity}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg">{herb.name}</h3>
        <p className="text-xs text-gray-500 italic mb-2">{herb.scientificName}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{herb.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {herb.uses.slice(0, 3).map((use) => (
            <span key={use} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">{use}</span>
          ))}
        </div>
        <button
          onClick={() => onViewDetails(herb)}
          className="w-full py-2 bg-[#2D5016] text-white rounded-lg hover:bg-[#3d6b1e] transition-colors flex items-center justify-center gap-2"
        >
          <Info className="w-4 h-4" /> View Details
        </button>
      </div>
    </div>
  );
};

export default HerbCard;
