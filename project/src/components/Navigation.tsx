import React from 'react';
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  User,
  GraduationCap,
  MapPin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Navigation({ activeView, onViewChange }: NavigationProps) {
  const { user, logout, switchRole } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...baseItems,
          { id: 'timetable', label: 'Timetable', icon: Calendar },
          { id: 'attendance', label: 'Attendance', icon: CheckSquare },
          { id: 'movement', label: 'Movement Pass', icon: MapPin },
          { id: 'activities', label: 'Activities', icon: GraduationCap },
          { id: 'social', label: 'Study Groups', icon: Users },
        ];
      case 'teacher':
        return [
          ...baseItems,
          { id: 'classroom', label: 'Classroom', icon: Users },
          { id: 'attendance-teacher', label: 'Attendance', icon: CheckSquare },
          { id: 'movement-requests', label: 'Movement Passes', icon: MapPin },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        ];
      case 'admin':
        return [
          ...baseItems,
          { id: 'students', label: 'Students', icon: Users },
          { id: 'teachers', label: 'Teachers', icon: User },
          { id: 'timetables', label: 'Timetables', icon: Calendar },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'parent':
        return [
          ...baseItems,
          { id: 'child-attendance', label: 'Attendance', icon: CheckSquare },
          { id: 'child-performance', label: 'Performance', icon: BarChart3 },
          { id: 'alerts', label: 'Alerts', icon: User },
        ];
      case 'counselor':
        return [
          ...baseItems,
          { id: 'risk-alerts', label: 'Risk Alerts', icon: User },
          { id: 'interventions', label: 'Interventions', icon: Users },
          { id: 'reports-counselor', label: 'Reports', icon: BarChart3 },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">EduFlow</h1>
            <p className="text-sm text-gray-500">{user?.role?.toUpperCase()}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Switch Role (Demo)</p>
          <select 
            value={user?.role || ''} 
            onChange={(e) => switchRole(e.target.value as any)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
            <option value="parent">Parent</option>
            <option value="counselor">Counselor</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center space-x-2 px-3 py-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign out</span>
        </button>
      </div>
    </div>
  );
}