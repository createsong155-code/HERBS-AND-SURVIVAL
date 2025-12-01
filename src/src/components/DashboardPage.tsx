import React from 'react';
import { LayoutDashboard, Clock, Leaf, TrendingUp, Download, Calendar, Users, Heart } from 'lucide-react';
import { Herb } from '../data/herbsData';

interface DashboardPageProps {
  recentlyViewed: Herb[];
  favorites: number[];
  allHerbs: Herb[];
  isOnline: boolean;
  onViewDetails: (herb: Herb) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ recentlyViewed, favorites, allHerbs, isOnline, onViewDetails }) => {
  const seasonalHerbs = allHerbs.slice(0, 4);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <LayoutDashboard className="w-6 h-6 text-[#2D5016]" />
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <Leaf className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">{allHerbs.length}</p>
          <p className="text-sm opacity-80">Total Herbs</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
          <Heart className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">{favorites.length}</p>
          <p className="text-sm opacity-80">Favorites</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <Users className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">1.2k</p>
          <p className="text-sm opacity-80">Community</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white">
          <Download className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-2xl font-bold">{isOnline ? 'Synced' : 'Offline'}</p>
          <p className="text-sm opacity-80">Data Status</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#2D5016]" />
          <h3 className="font-bold text-gray-800">Recently Viewed</h3>
        </div>
        {recentlyViewed.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentlyViewed.map(herb => (
              <div key={herb.id} onClick={() => onViewDetails(herb)} className="flex-shrink-0 w-24 cursor-pointer group">
                <img src={herb.image} alt={herb.name} className="w-24 h-24 rounded-lg object-cover group-hover:ring-2 ring-[#2D5016]" />
                <p className="text-sm font-medium text-gray-800 mt-1 truncate">{herb.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No herbs viewed yet. Start exploring!</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#2D5016]" />
          <h3 className="font-bold text-gray-800">Seasonal Picks for {currentMonth}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {seasonalHerbs.map(herb => (
            <div key={herb.id} onClick={() => onViewDetails(herb)} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
              <img src={herb.image} alt={herb.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-medium text-gray-800">{herb.name}</p>
                <p className="text-xs text-gray-500">{herb.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#2D5016]" />
          <h3 className="font-bold text-gray-800">Community Activity</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-gray-600"><span className="font-medium">ForagerJane</span> posted in Identification</p>
            <span className="text-gray-400 ml-auto">2h ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-gray-600"><span className="font-medium">HerbMaster</span> shared a recipe</p>
            <span className="text-gray-400 ml-auto">5h ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <p className="text-gray-600"><span className="font-medium">GreenThumb</span> asked a question</p>
            <span className="text-gray-400 ml-auto">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
