import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Target,
  TrendingUp,
  BookOpen,
  MapPin,
  Bell,
  Zap
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import MobileLayout from '../MobileLayout';

export default function MobileStudentDashboard() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentClass = {
    subject: 'Mathematics',
    teacher: 'Dr. Smith',
    room: 'Room 101',
    startTime: '09:00',
    endTime: '10:00'
  };

  const nextClass = {
    subject: 'Physics',
    teacher: 'Prof. Johnson',
    room: 'Lab 201',
    startTime: '10:15',
    endTime: '11:15'
  };

  const quickStats = [
    { label: 'Attendance', value: '95%', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Goals', value: '7/10', icon: Target, color: 'bg-blue-100 text-blue-600' },
    { label: 'Streak', value: '12d', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
    { label: 'Activities', value: '8/12', icon: BookOpen, color: 'bg-orange-100 text-orange-600' }
  ];

  const todaySchedule = [
    { time: '09:00-10:00', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 101', current: true },
    { time: '10:15-11:15', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 201', current: false },
    { time: '11:15-12:15', subject: 'Free Period', teacher: '', room: '', current: false },
    { time: '12:15-13:15', subject: 'Computer Science', teacher: 'Mr. Wilson', room: 'Lab 301', current: false }
  ];

  const alerts = [
    { type: 'info', title: 'Free Period Alert', message: 'You have a free period from 11:15 - 12:15' },
    { type: 'warning', title: 'Assignment Due', message: 'Physics lab report due tomorrow' }
  ];

  return (
    <MobileLayout 
      title="Good morning!" 
      rightAction={
        <button className="p-2 text-gray-600 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
        </button>
      }
    >
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">{user?.name} 👋</h2>
          <p className="text-sm text-gray-600 mt-1">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Current Class Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-indigo-100 text-sm">Currently in</p>
              <h3 className="text-xl font-bold">{currentClass.subject}</h3>
              <p className="text-indigo-100 text-sm">{currentClass.teacher}</p>
            </div>
            <div className="text-right">
              <p className="text-indigo-100 text-sm">Until</p>
              <p className="text-2xl font-bold">{currentClass.endTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-indigo-200" />
              <span className="text-sm text-indigo-100">{currentClass.room}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-indigo-200" />
              <span className="text-sm text-indigo-100">
                {Math.floor(Math.random() * 30 + 15)} min left
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Class */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Next class</p>
              <h3 className="text-lg font-bold text-gray-900">{nextClass.subject}</h3>
              <p className="text-sm text-gray-600">{nextClass.teacher} • {nextClass.room}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600">Starts at</p>
              <p className="text-xl font-bold text-blue-800">{nextClass.startTime}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-green-500 text-white p-4 rounded-xl flex items-center justify-center space-x-2 shadow-sm">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Mark Attendance</span>
          </button>
          <button className="bg-orange-500 text-white p-4 rounded-xl flex items-center justify-center space-x-2 shadow-sm">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Movement Pass</span>
          </button>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {todaySchedule.map((slot, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg ${
                  slot.current 
                    ? 'bg-indigo-50 border border-indigo-200' 
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-600">{slot.time}</span>
                    {slot.current && (
                      <span className="px-2 py-1 bg-indigo-500 text-white text-xs rounded-full">
                        Live
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-gray-900 mt-1">{slot.subject}</p>
                  {slot.teacher && (
                    <p className="text-xs text-gray-600">{slot.teacher}</p>
                  )}
                </div>
                {slot.room && (
                  <span className="text-xs text-gray-500">{slot.room}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-xl border ${
                alert.type === 'warning' 
                  ? 'bg-orange-50 border-orange-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                {alert.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                ) : (
                  <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}