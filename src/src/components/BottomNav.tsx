import React from 'react';
import { Home, Heart, Users, LayoutDashboard, Wifi, WifiOff } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOnline: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, isOnline }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-between px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-2 px-1 transition-all ${
                isActive 
                  ? 'text-[#2D5016]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-green-100' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              </div>
              <span className="text-xs mt-0.5 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className={`flex items-center justify-center gap-1 py-1 text-xs ${isOnline ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
        {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
        <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
      </div>
    </nav>
  );
};

export default BottomNav;
