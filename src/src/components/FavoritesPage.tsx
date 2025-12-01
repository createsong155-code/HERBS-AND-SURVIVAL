import React, { useState } from 'react';
import { Heart, Tag, StickyNote, Trash2, X } from 'lucide-react';
import { Herb } from '../data/herbsData';

interface FavoritesPageProps {
  favorites: number[];
  allHerbs: Herb[];
  onRemoveFavorite: (id: number) => void;
  onViewDetails: (herb: Herb) => void;
}

interface HerbNote {
  [key: number]: { note: string; tags: string[] };
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, allHerbs, onRemoveFavorite, onViewDetails }) => {
  const [notes, setNotes] = useState<HerbNote>({});
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [noteText, setNoteText] = useState('');

  const favoriteHerbs = allHerbs.filter(h => favorites.includes(h.id));

  const saveNote = (id: number) => {
    setNotes(prev => ({ ...prev, [id]: { ...prev[id], note: noteText, tags: prev[id]?.tags || [] } }));
    setEditingNote(null);
    setNoteText('');
  };

  if (favoriteHerbs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Favorites Yet</h3>
        <p className="text-gray-500 max-w-xs">Start adding herbs to your favorites to build your personal collection.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-red-500 fill-current" />
        <h2 className="text-2xl font-bold text-gray-800">My Favorites</h2>
        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-sm">{favoriteHerbs.length}</span>
      </div>

      <div className="space-y-4">
        {favoriteHerbs.map(herb => (
          <div key={herb.id} className="bg-white rounded-xl shadow-md p-4">
            <div className="flex gap-4">
              <img src={herb.image} alt={herb.name} className="w-20 h-20 rounded-lg object-cover cursor-pointer" onClick={() => onViewDetails(herb)} />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">{herb.name}</h3>
                    <p className="text-xs text-gray-500 italic">{herb.scientificName}</p>
                  </div>
                  <button onClick={() => onRemoveFavorite(herb.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {herb.uses.map(use => (
                    <span key={use} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">{use}</span>
                  ))}
                </div>
              </div>
            </div>
            
            {notes[herb.id]?.note && editingNote !== herb.id && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-700">{notes[herb.id].note}</p>
              </div>
            )}
            
            {editingNote === herb.id ? (
              <div className="mt-3">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add your personal notes..."
                  className="w-full p-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-[#2D5016] outline-none"
                  rows={3}
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => saveNote(herb.id)} className="px-4 py-1.5 bg-[#2D5016] text-white rounded-lg text-sm">Save</button>
                  <button onClick={() => setEditingNote(null)} className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setEditingNote(herb.id); setNoteText(notes[herb.id]?.note || ''); }}
                className="mt-3 flex items-center gap-1 text-sm text-[#2D5016] hover:underline"
              >
                <StickyNote className="w-4 h-4" /> {notes[herb.id]?.note ? 'Edit Note' : 'Add Note'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
