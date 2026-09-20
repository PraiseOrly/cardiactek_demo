import { Link, useLocation } from 'react-router-dom';
import {
  Heart,
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  Search,
  CheckCircle,
  BookOpen,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Activity, label: 'Assessments', path: '/patients' },
    { icon: FileText, label: 'ECG Analysis', path: '/patients' },
    { icon: Search, label: 'Investigations', path: '/investigations' },
    { icon: CheckCircle, label: 'Follow-ups', path: '/followups' },
    { icon: BookOpen, label: 'Reports', path: '/reports' },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary-600 fill-current" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">CardiacTEK</h1>
              <p className="text-xs text-gray-500">Care Platform</p>
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
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom items */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/settings')
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Clinician profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="text-sm">
            <p className="text-gray-600">Logged in as</p>
            <p className="font-medium text-gray-900">Dr. Sarah Chen</p>
            <p className="text-xs text-gray-500">Cardiologist</p>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary-600 fill-current" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CardiacTEK</h1>
                  <p className="text-xs text-gray-500">Care Platform</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-200 p-4">
              <div className="text-sm">
                <p className="text-gray-600">Logged in as</p>
                <p className="font-medium text-gray-900">Dr. Sarah Chen</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
