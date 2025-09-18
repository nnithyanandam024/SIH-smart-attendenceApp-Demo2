import React from 'react';
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  MapPin, 
  Users, 
  User,
  BarChart3,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MobileNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function MobileNavigation({ activeView, onViewChange }: MobileNavigationProps) {
  const { user } = useAuth();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Home', icon: Home },
          { id: 'attendance', label: 'Attendance', icon: CheckSquare },
          { id: 'movement', label: 'Pass', icon: MapPin },
          { id: 'activities', label: 'Activities', icon: Calendar },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      case 'teacher':
        return [
          { id: 'dashboard', label: 'Home', icon: Home },
          { id: 'classroom', label: 'Class', icon: Users },
          { id: 'movement-requests', label: 'Passes', icon: MapPin },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Home', icon: Home },
          { id: 'students', label: 'Students', icon: Users },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      default:
        return [
          { id: 'dashboard', label: 'Home', icon: Home },
          { id: 'profile', label: 'Profile', icon: User },
        ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="bg-white border-t border-gray-200 px-2 py-1 safe-area-bottom">
      <div className="flex justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}