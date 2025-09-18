import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import MobileApp from './components/mobile/MobileApp';
import StudentDashboard from './components/student/StudentDashboard';
import AttendanceModule from './components/student/AttendanceModule';
import MovementPass from './components/student/MovementPass';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function AppContent() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) {
    return <LoginForm />;
  }

  // Mobile App View
  if (isMobile) {
    return <MobileApp />;
  }

  // Desktop View
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        switch (user.role) {
          case 'student':
            return <StudentDashboard />;
          case 'teacher':
            return <TeacherDashboard />;
          case 'admin':
            return <AdminDashboard />;
          default:
            return <div className="p-6">Dashboard for {user.role}</div>;
        }
      
      case 'attendance':
        return <AttendanceModule />;
      
      case 'movement':
        return <MovementPass />;

      case 'classroom':
        return <TeacherDashboard />;

      // Placeholder views for other functionality
      case 'timetable':
        return <div className="p-6">Timetable view - Coming soon</div>;
      case 'activities':
        return <div className="p-6">AI-powered Activity Planner - Coming soon</div>;
      case 'social':
        return <div className="p-6">Study Groups & Social Learning - Coming soon</div>;
      case 'analytics':
        return <div className="p-6">Advanced Analytics - Coming soon</div>;
      case 'settings':
        return <div className="p-6">Settings - Coming soon</div>;
      
      default:
        return <div className="p-6">View not implemented yet</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;