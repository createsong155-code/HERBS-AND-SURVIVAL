import React from 'react';
import { Leaf, User, Settings, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  onAccountClick: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick, onAccountClick, menuOpen, setMenuOpen }) => {
  return (
    <header className="bg-gradient-to-r from-[#2D5016] to-[#3d6b1e] text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Herbs & Survival</h1>
            <p className="text-xs text-green-200">Your Natural Medicine Guide</p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Account</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-800">
              <button onClick={onAccountClick} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                <User className="w-4 h-4" /> Account
              </button>
              <button onClick={onSettingsClick} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
