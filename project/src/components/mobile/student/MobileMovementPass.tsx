import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Navigation,
  Plus
} from 'lucide-react';
import MobileLayout from '../MobileLayout';

export default function MobileMovementPass() {
  const [activeTab, setActiveTab] = useState<'active' | 'request' | 'history'>('active');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    reason: '',
    destination: '',
    duration: 30
  });

  const destinations = [
    'Library', 'Restroom', 'Principal\'s Office', 'Nurse\'s Office', 
    'Computer Lab', 'Canteen', 'Other'
  ];

  const reasons = [
    'Academic Research', 'Medical Emergency', 'Administrative Work', 
    'Personal Emergency', 'Library Visit', 'Lab Work', 'Other'
  ];

  const activePasses = [
    {
      id: '1',
      reason: 'Library Visit',
      destination: 'Main Library',
      validUntil: '11:30',
      status: 'approved',
      approvedBy: 'Mrs. Johnson'
    }
  ];

  const passHistory = [
    {
      id: '1',
      reason: 'Library Visit',
      destination: 'Main Library',
      requestTime: '10:30',
      validUntil: '11:30',
      status: 'completed',
      approvedBy: 'Mrs. Johnson'
    }
  ];

  const handleSubmitRequest = () => {
    console.log('Submitting request:', newRequest);
    setNewRequest({ reason: '', destination: '', duration: 30 });
    setShowRequestForm(false);
    setActiveTab('active');
  };

  if (showRequestForm) {
    return (
      <MobileLayout 
        title="New Movement Pass" 
        showBack={true}
        onBack={() => setShowRequestForm(false)}
      >
        <div className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Movement
            </label>
            <select
              value={newRequest.reason}
              onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select destination</option>
              {destinations.map((dest) => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration: {newRequest.duration} minutes
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
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15 min</span>
              <span>2 hours</span>
            </div>
          </div>

          <button
            onClick={handleSubmitRequest}
            disabled={!newRequest.reason || !newRequest.destination}
            className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Submit Request</span>
          </button>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-800">Current Location</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">Classroom 301A - Mathematics</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout 
      title="Movement Pass"
      rightAction={
        <button 
          onClick={() => setShowRequestForm(true)}
          className="p-2 bg-indigo-600 text-white rounded-lg"
        >
          <Plus className="w-5 h-5" />
        </button>
      }
    >
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="flex bg-gray-100 m-4 p-1 rounded-xl">
          {[
            { id: 'active', label: 'Active' },
            { id: 'request', label: 'Pending' },
            { id: 'history', label: 'History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 px-4 pb-4">
          {/* Active Tab */}
          {activeTab === 'active' && (
            <div className="space-y-4">
              {activePasses.length === 0 ? (
                <div className="text-center py-12">
                  <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No active movement passes</p>
                  <button
                    onClick={() => setShowRequestForm(true)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium"
                  >
                    Request New Pass
                  </button>
                </div>
              ) : (
                activePasses.map((pass) => (
                  <div key={pass.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{pass.reason}</h3>
                        <p className="text-sm text-gray-600">to {pass.destination}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        ACTIVE
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Valid until {pass.validUntil}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-800">
                          Geotracking Active
                        </span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        Your location is being tracked for safety
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Request Tab */}
          {activeTab === 'request' && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No pending requests</p>
              <button
                onClick={() => setShowRequestForm(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium"
              >
                Create New Request
              </button>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {passHistory.map((pass) => (
                <div key={pass.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{pass.reason}</h3>
                      <p className="text-sm text-gray-600">to {pass.destination}</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      COMPLETED
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Requested: {pass.requestTime}</p>
                    <p>Valid until: {pass.validUntil}</p>
                    <p>Approved by: {pass.approvedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}