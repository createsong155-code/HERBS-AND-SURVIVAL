import React, { useState } from 'react';
import { X, Moon, Sun, Download, Bell, MapPin, Ruler } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [units, setUnits] = useState('metric');
  const [location, setLocation] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-[#2D5016]" /> : <Sun className="w-5 h-5 text-[#2D5016]" />}
              <div>
                <p className="font-medium text-gray-800">Dark Mode</p>
                <p className="text-sm text-gray-500">Easier on the eyes at night</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-[#2D5016]' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#2D5016]" />
              <div>
                <p className="font-medium text-gray-800">Notifications</p>
                <p className="text-sm text-gray-500">Seasonal herb reminders</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-[#2D5016]' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-[#2D5016]" />
              <div>
                <p className="font-medium text-gray-800">Offline Sync</p>
                <p className="text-sm text-gray-500">Download herbs for offline use</p>
              </div>
            </div>
            <button
              onClick={() => setOfflineSync(!offlineSync)}
              className={`w-12 h-6 rounded-full transition-colors ${offlineSync ? 'bg-[#2D5016]' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${offlineSync ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <Ruler className="w-5 h-5 text-[#2D5016]" />
              <p className="font-medium text-gray-800">Measurement Units</p>
            </div>
            <select
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2D5016] outline-none"
            >
              <option value="metric">Metric (g, ml)</option>
              <option value="imperial">Imperial (oz, cups)</option>
            </select>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-[#2D5016]" />
              <p className="font-medium text-gray-800">Your Location</p>
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your growing zone..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2D5016] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
