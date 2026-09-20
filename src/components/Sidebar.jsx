import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Send, CheckCircle, BookOpen, Settings, Heart } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function Sidebar() {
  const location = useLocation();
  const { currentUser } = useAppStore();


  const navItems = [
    { icon: LayoutDashboard, label: 'Worklist', path: '/' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: FileText, label: 'ECGs', path: '/ecgs' },
    { icon: Send, label: 'Referrals', path: '/referrals' },
    { icon: CheckCircle, label: 'Follow-ups', path: '/followups' },
    { icon: BookOpen, label: 'Reports', path: '/reports' }
  ];

  const isActiveExact = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-blue-600 fill-current" />
          <div>
            <h1 className="text-lg font-bold text-gray-900">CardiacTEK</h1>
            <p className="text-xs text-gray-500">Referral Queue</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 p-4 space-y-4">
        <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </Link>

        <div className="px-4 py-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">Current clinician</p>
          <p className="font-medium text-gray-900 text-sm mt-1">{currentUser.name}</p>
          <p className="text-xs text-gray-500">{currentUser.role}</p>
        </div>
      </div>
    </aside>
  );
}
