import React from 'react';
import { X, Heart, MapPin, Beaker, AlertTriangle, Check } from 'lucide-react';
import { Herb } from '../data/herbsData';

interface HerbDetailModalProps {
  herb: Herb | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const HerbDetailModal: React.FC<HerbDetailModalProps> = ({ herb, onClose, isFavorite, onToggleFavorite }) => {
  if (!herb) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img src={herb.image} alt={herb.name} className="w-full h-56 object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white">
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => onToggleFavorite(herb.id)}
            className={`absolute top-3 left-3 p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-white'}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{herb.name}</h2>
              <p className="text-sm text-gray-500 italic">{herb.scientificName}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
              herb.toxicity === 'safe' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {herb.toxicity === 'safe' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              {herb.toxicity}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{herb.description}</p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-[#2D5016]" />
              <span>Growing Zone: {herb.growingZone}</span>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Medicinal Uses</h4>
              <div className="flex flex-wrap gap-2">
                {herb.uses.map(use => (
                  <span key={use} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">{use}</span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Beaker className="w-4 h-4" /> Preparation Methods
              </h4>
              <div className="flex flex-wrap gap-2">
                {herb.preparation.map(prep => (
                  <span key={prep} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">{prep}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerbDetailModal;
