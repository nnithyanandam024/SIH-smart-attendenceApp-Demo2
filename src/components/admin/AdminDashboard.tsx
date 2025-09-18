import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Upload,
  Settings
} from 'lucide-react';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const overallStats = [
    { label: 'Total Students', value: '1,247', change: '+23', icon: Users, color: 'text-blue-600' },
    { label: 'Total Teachers', value: '89', change: '+2', icon: GraduationCap, color: 'text-green-600' },
    { label: 'Active Classes', value: '45', change: '0', icon: Calendar, color: 'text-purple-600' },
    { label: 'Overall Attendance', value: '94.2%', change: '+1.2%', icon: CheckCircle, color: 'text-indigo-600' }
  ];

  const attendanceTrends = [
    { grade: 'Grade 9', present: 234, total: 250, percentage: 93.6 },
    { grade: 'Grade 10', present: 298, total: 315, percentage: 94.6 },
    { grade: 'Grade 11', present: 267, total: 282, percentage: 94.7 },
    { grade: 'Grade 12', present: 189, total: 200, percentage: 94.5 }
  ];

  const riskAlerts = [
    { student: 'John Doe', grade: '10A', attendance: 67, performance: 'Low', lastSeen: '2 days ago' },
    { student: 'Sarah Wilson', grade: '11B', attendance: 72, performance: 'Medium', lastSeen: '1 day ago' },
    { student: 'Mike Johnson', grade: '9C', attendance: 65, performance: 'Low', lastSeen: '3 days ago' }
  ];

  const recentActivities = [
    { type: 'attendance', message: 'Bulk attendance uploaded for Grade 10', time: '10 minutes ago' },
    { type: 'alert', message: 'Early intervention triggered for 3 students', time: '25 minutes ago' },
    { type: 'integration', message: 'Google Classroom sync completed', time: '1 hour ago' },
    { type: 'report', message: 'Weekly attendance report generated', time: '2 hours ago' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Comprehensive overview of school management</p>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">View Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import Data</span>
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">+{stat.change}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trends */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance by Grade</h2>
          
          <div className="space-y-4">
            {attendanceTrends.map((grade, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{grade.grade}</h3>
                  <span className="text-lg font-bold text-indigo-600">{grade.percentage}%</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{grade.present} of {grade.total} present</span>
                  <span>{grade.total - grade.present} absent</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${grade.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Predictive Analytics */}
          <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <h4 className="font-medium text-blue-800">Predictive Analytics</h4>
            </div>
            <p className="text-sm text-blue-600">
              Based on current trends, attendance is expected to remain stable at 94.2% ± 1.5% this month.
              3 students require early intervention to prevent absenteeism risk.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Risk Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span>Risk Alerts</span>
            </h3>
            
            <div className="space-y-3">
              {riskAlerts.map((alert, index) => (
                <div key={index} className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="mb-2">
                    <h4 className="font-medium text-red-900 text-sm">{alert.student}</h4>
                    <p className="text-xs text-red-600">{alert.grade}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-red-600">Attendance: </span>
                      <span className="font-medium text-red-800">{alert.attendance}%</span>
                    </div>
                    <div>
                      <span className="text-red-600">Performance: </span>
                      <span className="font-medium text-red-800">{alert.performance}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-red-600 mt-1">Last seen: {alert.lastSeen}</p>
                  
                  <button className="w-full mt-2 bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-700">
                    Notify Counselor & Parent
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Activities</h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-2">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'alert' ? 'bg-red-400' :
                    activity.type === 'attendance' ? 'bg-green-400' :
                    activity.type === 'integration' ? 'bg-blue-400' :
                    'bg-purple-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                Generate Attendance Report
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                Bulk Upload Timetables
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                Configure Geofencing
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                Sync with LMS
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}