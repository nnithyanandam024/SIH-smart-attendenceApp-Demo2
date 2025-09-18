import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Target,
  TrendingUp,
  BookOpen,
  Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { TimeSlot, Alert, Activity } from '../../types';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todaySchedule, setTodaySchedule] = useState<TimeSlot[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    loadDashboardData();
    return () => clearInterval(timer);
  }, []);

  const loadDashboardData = () => {
    // Mock data for today's schedule
    const mockSchedule: TimeSlot[] = [
      { id: '1', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 101', startTime: '09:00', endTime: '10:00', type: 'class' },
      { id: '2', subject: 'Break', teacher: '', room: '', startTime: '10:00', endTime: '10:15', type: 'break' },
      { id: '3', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 201', startTime: '10:15', endTime: '11:15', type: 'class' },
      { id: '4', subject: 'Free Period', teacher: '', room: '', startTime: '11:15', endTime: '12:15', type: 'free' },
      { id: '5', subject: 'Computer Science', teacher: 'Mr. Wilson', room: 'Lab 301', startTime: '12:15', endTime: '13:15', type: 'class' },
    ];

    const mockAlerts: Alert[] = [
      { id: '1', type: 'info', title: 'Free Period Alert', message: 'You have a free period from 11:15 - 12:15. Check your activity planner!', timestamp: new Date().toISOString() },
      { id: '2', type: 'warning', title: 'Assignment Due', message: 'Physics lab report due tomorrow', timestamp: new Date().toISOString() }
    ];

    const mockActivities: Activity[] = [
      { id: '1', title: 'Math Practice Test', type: 'practice', duration: 45, difficulty: 'medium', subject: 'Mathematics', description: 'Solve quadratic equations' },
      { id: '2', title: 'Physics Review', type: 'review', duration: 30, difficulty: 'easy', subject: 'Physics', description: 'Review Newton\'s laws' },
      { id: '3', title: 'Study Group: CS Project', type: 'social', duration: 60, difficulty: 'hard', subject: 'Computer Science', description: 'Collaborate on final project' }
    ];

    setTodaySchedule(mockSchedule);
    setAlerts(mockAlerts);
    setActivities(mockActivities);
  };

  const getCurrentClass = () => {
    const now = currentTime;
    const currentTimeStr = now.toTimeString().slice(0, 5);
    
    return todaySchedule.find(slot => {
      return currentTimeStr >= slot.startTime && currentTimeStr <= slot.endTime;
    });
  };

  const getNextClass = () => {
    const now = currentTime;
    const currentTimeStr = now.toTimeString().slice(0, 5);
    
    return todaySchedule.find(slot => currentTimeStr < slot.startTime);
  };

  const currentClass = getCurrentClass();
  const nextClass = getNextClass();

  const stats = [
    { label: 'Attendance Rate', value: '95%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Goals Progress', value: '7/10', icon: Target, color: 'text-blue-600' },
    { label: 'Study Streak', value: '12 days', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Activities Done', value: '8/12', color: 'text-orange-600', icon: BookOpen }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Good morning, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current/Next Class */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Live Schedule</h2>
          
          {currentClass ? (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Currently in class</p>
                  <h3 className="text-lg font-bold text-green-800">{currentClass.subject}</h3>
                  <p className="text-sm text-green-600">{currentClass.teacher} • {currentClass.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">Until</p>
                  <p className="text-lg font-bold text-green-800">{currentClass.endTime}</p>
                </div>
              </div>
            </div>
          ) : nextClass ? (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Next class</p>
                  <h3 className="text-lg font-bold text-blue-800">{nextClass.subject}</h3>
                  <p className="text-sm text-blue-600">{nextClass.teacher} • {nextClass.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600">Starts at</p>
                  <p className="text-lg font-bold text-blue-800">{nextClass.startTime}</p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Today's Schedule */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 mb-3">Today's Schedule</h3>
            {todaySchedule.map((slot) => (
              <div 
                key={slot.id} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  slot.id === currentClass?.id 
                    ? 'bg-green-50 border-green-200' 
                    : slot.type === 'free'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{slot.subject}</p>
                    {slot.teacher && <p className="text-sm text-gray-600">{slot.teacher}</p>}
                  </div>
                </div>
                {slot.room && (
                  <span className="text-sm text-gray-500">{slot.room}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Alerts and Activities */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg border ${
                    alert.type === 'warning' 
                      ? 'bg-orange-50 border-orange-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {alert.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                    ) : (
                      <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                      <p className="text-xs text-gray-600">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Activities */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Suggested Activities</h3>
            <div className="space-y-3">
              {activities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      activity.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{activity.duration} min</span>
                    <button className="text-xs text-indigo-600 hover:text-indigo-800">
                      Start →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}