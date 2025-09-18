import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Navigation,
  Users
} from 'lucide-react';
import { MovementPass as MovementPassType } from '../../types';

export default function MovementPass() {
  const [activeTab, setActiveTab] = useState<'request' | 'active' | 'history'>('request');
  const [newRequest, setNewRequest] = useState({
    reason: '',
    destination: '',
    duration: 30
  });
  const [activePasses, setActivePasses] = useState<MovementPassType[]>([]);
  const [passHistory, setPassHistory] = useState<MovementPassType[]>([
    {
      id: '1',
      studentId: 'student1',
      reason: 'Library Visit',
      destination: 'Main Library',
      requestTime: '2024-01-15T10:30:00Z',
      validUntil: '2024-01-15T11:30:00Z',
      status: 'completed',
      approvedBy: 'Mrs. Johnson'
    }
  ]);

  const destinations = [
    'Library',
    'Restroom',
    'Principal\'s Office',
    'Nurse\'s Office',
    'Computer Lab',
    'Canteen',
    'Other'
  ];

  const reasons = [
    'Academic Research',
    'Medical Emergency',
    'Administrative Work',
    'Personal Emergency',
    'Library Visit',
    'Lab Work',
    'Other'
  ];

  const handleSubmitRequest = () => {
    const newPass: MovementPassType = {
      id: Date.now().toString(),
      studentId: 'current-user',
      reason: newRequest.reason,
      destination: newRequest.destination,
      requestTime: new Date().toISOString(),
      validUntil: new Date(Date.now() + newRequest.duration * 60000).toISOString(),
      status: 'pending'
    };

    setActivePasses([...activePasses, newPass]);
    setNewRequest({ reason: '', destination: '', duration: 30 });
    setActiveTab('active');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Movement Pass</h1>
        <p className="text-gray-600">Request permission to move around the campus</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'request', label: 'New Request', icon: Send },
          { id: 'active', label: 'Active Passes', icon: Navigation },
          { id: 'history', label: 'History', icon: Clock }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Request Tab */}
      {activeTab === 'request' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Request Movement Pass</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Movement
              </label>
              <select
                value={newRequest.reason}
                onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select reason</option>
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <select
                value={newRequest.destination}
                onChange={(e) => setNewRequest({...newRequest, destination: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select destination</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="range"
                min="15"
                max="120"
                step="15"
                value={newRequest.duration}
                onChange={(e) => setNewRequest({...newRequest, duration: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>15 min</span>
                <span className="font-medium">{newRequest.duration} minutes</span>
                <span>2 hours</span>
              </div>
            </div>

            <button
              onClick={handleSubmitRequest}
              disabled={!newRequest.reason || !newRequest.destination}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request</span>
            </button>
          </div>

          {/* Current Status Alert */}
          <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-800">Current Location</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">Classroom 301A - Mathematics</p>
          </div>
        </div>
      )}

      {/* Active Passes Tab */}
      {activeTab === 'active' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Active Movement Passes</h2>
          
          {activePasses.length === 0 ? (
            <div className="text-center py-12">
              <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active movement passes</p>
              <button
                onClick={() => setActiveTab('request')}
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                Request a new pass →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {activePasses.map((pass) => (
                <div key={pass.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{pass.reason}</h3>
                      <p className="text-sm text-gray-600">to {pass.destination}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pass.status === 'approved' ? 'bg-green-100 text-green-800' :
                      pass.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {pass.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Valid until {formatTime(pass.validUntil)}</span>
                    </div>
                    {pass.approvedBy && (
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Approved by {pass.approvedBy}</span>
                      </div>
                    )}
                  </div>

                  {pass.status === 'approved' && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-800">
                          Geotracking Active
                        </span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        Your location is being tracked for safety purposes
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Movement Pass History</h2>
          
          <div className="space-y-4">
            {passHistory.map((pass) => (
              <div key={pass.id} className="border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{pass.reason}</h3>
                    <p className="text-sm text-gray-600">to {pass.destination}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    pass.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                    pass.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {pass.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>Requested: {formatTime(pass.requestTime)}</p>
                  <p>Valid until: {formatTime(pass.validUntil)}</p>
                  {pass.approvedBy && <p>Approved by: {pass.approvedBy}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}