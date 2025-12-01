import React from 'react';
import SearchBar from './SearchBar';
import HerbCard from './HerbCard';
import { Herb } from '../data/herbsData';

interface HomePageProps {
  herbs: Herb[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  categories: string[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onViewDetails: (herb: Herb) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  herbs,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  favorites,
  onToggleFavorite,
  onViewDetails
}) => {
  const filteredHerbs = herbs.filter(herb => {
    const matchesSearch = herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.uses.some(u => u.toLowerCase().includes(searchQuery.toLowerCase())) ||
      herb.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || herb.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Discover Herbs</h2>
        <p className="text-gray-500">Explore nature's medicine cabinet</p>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {filteredHerbs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No herbs found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHerbs.map(herb => (
            <HerbCard
              key={herb.id}
              herb={herb}
              isFavorite={favorites.includes(herb.id)}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        Showing {filteredHerbs.length} of {herbs.length} herbs
      </div>
    </div>
  );
};

export default HomePage;
