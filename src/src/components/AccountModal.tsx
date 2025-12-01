import React, { useState } from 'react';
import { X, User, Mail, Lock, Camera, Save } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('Herbalist');
  const [email, setEmail] = useState('user@herbs.com');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const restrictions = ['Pregnancy', 'Nursing', 'Blood Thinners', 'Allergies', 'Diabetes', 'Heart Conditions'];

  const toggleRestriction = (r: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Account</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5 space-y-5">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#2D5016] to-[#4a7c2a] rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" /> Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2D5016] outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2D5016] outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Health Considerations</label>
            <p className="text-xs text-gray-500 mb-3">Select any that apply for personalized safety warnings</p>
            <div className="flex flex-wrap gap-2">
              {restrictions.map(r => (
                <button
                  key={r}
                  onClick={() => toggleRestriction(r)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    dietaryRestrictions.includes(r)
                      ? 'bg-[#2D5016] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              saved ? 'bg-green-500 text-white' : 'bg-[#2D5016] text-white hover:bg-[#3d6b1e]'
            }`}
          >
            <Save className="w-5 h-5" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
