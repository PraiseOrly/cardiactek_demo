import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function TopBar() {
  const { currentUser, switchRole } = useAppStore();

  const roleOptions = [
    { role: 'frontline', label: 'Dr. Amara Diallo (Frontline)' },
    { role: 'cardiologist', label: 'Prof. Kwesi Appiah (Cardiologist)' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient, ECG, referral..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6 ml-6">
        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-gray-900">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Role switcher */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
              {currentUser.role === 'frontline' ? 'Frontline' : 'Cardiologist'}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {roleOptions.map((opt) => (
              <button
                key={opt.role}
                onClick={() => switchRole(opt.role)}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* User menu */}
        <div className="relative group">
          <button className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold hover:bg-blue-200">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </button>
        </div>
      </div>
    </header>
  );
}
