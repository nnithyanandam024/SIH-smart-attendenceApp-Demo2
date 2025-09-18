import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import MobileNavigation from './MobileNavigation';
import MobileStudentDashboard from './student/MobileStudentDashboard';
import MobileAttendance from './student/MobileAttendance';
import MobileMovementPass from './student/MobileMovementPass';

export default function MobileApp() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <MobileStudentDashboard />;
      case 'attendance':
        return <MobileAttendance />;
      case 'movement':
        return <MobileMovementPass />;
      case 'activities':
        return (
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">AI Activity Planner</h2>
            <p className="text-gray-600">Coming soon - Personalized learning activities</p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h2>
            <p className="text-gray-600">This feature is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        {renderView()}
      </div>
      <MobileNavigation activeView={activeView} onViewChange={setActiveView} />
    </div>
  );
}