import React, { useState, useEffect } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import HomePage from './HomePage';
import FavoritesPage from './FavoritesPage';
import CommunityPage from './CommunityPage';
import DashboardPage from './DashboardPage';
import HerbDetailModal from './HerbDetailModal';
import SettingsModal from './SettingsModal';
import AccountModal from './AccountModal';
import { herbs } from '../data/herbsData';
import { moreHerbs } from '../data/herbsData2';
import { Herb } from '../data/herbsData';

const allHerbs = [...herbs, ...moreHerbs];
const categories = [...new Set(allHerbs.map(h => h.category))];

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Herb[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const viewDetails = (herb: Herb) => {
    setSelectedHerb(herb);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(h => h.id !== herb.id);
      return [herb, ...filtered].slice(0, 6);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <Header
        onSettingsClick={() => { setSettingsOpen(true); setMenuOpen(false); }}
        onAccountClick={() => { setAccountOpen(true); setMenuOpen(false); }}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      
      <main className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
        {activeTab === 'home' && (
          <HomePage
            herbs={allHerbs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onViewDetails={viewDetails}
          />
        )}
        {activeTab === 'favorites' && (
          <FavoritesPage
            favorites={favorites}
            allHerbs={allHerbs}
            onRemoveFavorite={toggleFavorite}
            onViewDetails={viewDetails}
          />
        )}
        {activeTab === 'community' && <CommunityPage isOnline={isOnline} />}
        {activeTab === 'dashboard' && (
          <DashboardPage
            recentlyViewed={recentlyViewed}
            favorites={favorites}
            allHerbs={allHerbs}
            isOnline={isOnline}
            onViewDetails={viewDetails}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} isOnline={isOnline} />
      <HerbDetailModal herb={selectedHerb} onClose={() => setSelectedHerb(null)} isFavorite={selectedHerb ? favorites.includes(selectedHerb.id) : false} onToggleFavorite={toggleFavorite} />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <AccountModal isOpen={accountOpen} onClose={() => setAccountOpen(false)} />
    </div>
  );
};

export default AppLayout;
