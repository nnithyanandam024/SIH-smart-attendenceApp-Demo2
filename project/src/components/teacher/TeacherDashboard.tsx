import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  MapPin,
  TrendingUp,
  BarChart3,
  UserCheck
} from 'lucide-react';

export default function TeacherDashboard() {
  const [selectedClass, setSelectedClass] = useState('10A-Math');

  const classes = [
    { id: '10A-Math', name: '10A Mathematics', students: 35, present: 32, time: '09:00-10:00' },
    { id: '10B-Math', name: '10B Mathematics', students: 30, present: 28, time: '10:15-11:15' },
    { id: '11A-Math', name: '11A Mathematics', students: 28, present: 25, time: '12:15-13:15' }
  ];

  const attendanceGrid = [
    { id: '1', name: 'Alice Johnson', rollNo: '001', status: 'present', time: '09:02', method: 'QR' },
    { id: '2', name: 'Bob Smith', rollNo: '002', status: 'present', time: '09:01', method: 'BLE' },
    { id: '3', name: 'Carol Davis', rollNo: '003', status: 'late', time: '09:15', method: 'Manual' },
    { id: '4', name: 'David Wilson', rollNo: '004', status: 'absent', time: '-', method: '-' },
    { id: '5', name: 'Emma Brown', rollNo: '005', status: 'present', time: '08:59', method: 'Face' }
  ];

  const movementRequests = [
    { id: '1', student: 'Alice Johnson', reason: 'Library Visit', destination: 'Main Library', time: '10:30', status: 'pending' },
    { id: '2', student: 'Bob Smith', reason: 'Nurse Office', destination: 'Health Center', time: '10:45', status: 'approved' }
  ];

  const alerts = [
    { id: '1', type: 'warning', message: 'David Wilson left classroom without movement pass', time: '10:20' },
    { id: '2', type: 'info', message: '3 students have pending movement requests', time: '10:15' }
  ];

  const currentClass = classes.find(c => c.id === selectedClass);
  const attendanceRate = currentClass ? Math.round((currentClass.present / currentClass.students) * 100) : 0;

  const handleMovementRequest = (requestId: string, action: 'approve' | 'reject') => {
    console.log(`${action} request ${requestId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">Monitor classroom attendance and student activities</p>
      </div>

      {/* Class Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Active Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.time})
                </option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-indigo-600">{attendanceRate}%</p>
            <p className="text-sm text-gray-600">Attendance Rate</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{currentClass?.students}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{currentClass?.present}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Late</p>
              <p className="text-2xl font-bold text-yellow-600">1</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{(currentClass?.students || 0) - (currentClass?.present || 0)}</p>
            </div>
            <UserCheck className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Attendance Grid */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Live Attendance Grid</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Roll No.</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Student Name</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-600">Time</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-600">Method</th>
                </tr>
              </thead>
              <tbody>
                {attendanceGrid.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium text-gray-900">{student.rollNo}</td>
                    <td className="py-3 text-sm text-gray-900">{student.name}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === 'present' ? 'bg-green-100 text-green-800' :
                        student.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-center text-sm text-gray-600">{student.time}</td>
                    <td className="py-3 text-center">
                      {student.method !== '-' && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {student.method}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <button className="text-indigo-600 hover:text-indigo-800">Refresh Grid</button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Movement Pass Requests */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Movement Requests</h3>
            <div className="space-y-3">
              {movementRequests.map((request) => (
                <div key={request.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{request.student}</h4>
                    <p className="text-xs text-gray-600">{request.reason} → {request.destination}</p>
                    <p className="text-xs text-gray-500">Requested at {request.time}</p>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMovementRequest(request.id, 'approve')}
                        className="flex-1 bg-green-600 text-white text-xs py-1 px-2 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleMovementRequest(request.id, 'reject')}
                        className="flex-1 bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {request.status === 'approved' && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">Tracking active</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Alerts</h3>
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
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Analytics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Weekly Average</span>
                <span className="font-medium text-gray-900">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Trend</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+2.5%</span>
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-indigo-700 flex items-center justify-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>View Full Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}