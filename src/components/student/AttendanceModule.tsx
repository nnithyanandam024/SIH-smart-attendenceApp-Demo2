import React, { useState, useRef } from 'react';
import { 
  QrCode, 
  Bluetooth, 
  Camera, 
  MapPin, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Smartphone
} from 'lucide-react';

export default function AttendanceModule() {
  const [selectedMethod, setSelectedMethod] = useState<'qr' | 'ble' | 'face' | 'manual'>('qr');
  const [isScanning, setIsScanning] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const attendanceMethods = [
    { id: 'qr', name: 'QR Code Scan', icon: QrCode, description: 'Scan classroom QR code' },
    { id: 'ble', name: 'Proximity (BLE)', icon: Bluetooth, description: 'Auto-detect via Bluetooth' },
    { id: 'face', name: 'Face Recognition', icon: Camera, description: 'Facial verification' },
    { id: 'manual', name: 'Manual Entry', icon: Smartphone, description: 'Manual check-in' }
  ];

  const todayAttendance = [
    { subject: 'Mathematics', status: 'present', time: '09:00', method: 'qr' },
    { subject: 'Physics', status: 'present', time: '10:15', method: 'ble' },
    { subject: 'Computer Science', status: 'pending', time: '12:15', method: null }
  ];

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Location access denied:', error);
        }
      );
    }
  };

  const handleAttendance = async () => {
    setIsScanning(true);
    setAttendanceStatus('processing');

    // Get location for geofencing
    handleLocationAccess();

    // Simulate attendance marking process
    setTimeout(() => {
      // Mock verification checks
      const isWithinGeoFence = true; // Mock geofence validation
      const isWithinTimeWindow = true; // Mock time validation
      const deviceCheck = true; // Mock anti-proxy check

      if (isWithinGeoFence && isWithinTimeWindow && deviceCheck) {
        setAttendanceStatus('success');
      } else {
        setAttendanceStatus('error');
      }
      setIsScanning(false);
    }, 2000);
  };

  const startFaceRecognition = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance</h1>
        <p className="text-gray-600">Mark your attendance using multiple verification methods</p>
      </div>

      {/* Attendance Methods */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Marking Methods</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {attendanceMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                  selectedMethod === method.id ? 'text-indigo-600' : 'text-gray-400'
                }`} />
                <h3 className="font-medium text-gray-900 text-sm">{method.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{method.description}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Method Interface */}
        <div className="bg-gray-50 rounded-lg p-6">
          {selectedMethod === 'qr' && (
            <div className="text-center">
              <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">QR Code Scanner</h3>
              <p className="text-gray-600 mb-4">Position the QR code within the frame</p>
              {isScanning ? (
                <div className="w-64 h-64 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                  <div className="animate-pulse">
                    <div className="w-48 h-48 border-4 border-indigo-500 rounded-lg"></div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleAttendance}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Scanning
                </button>
              )}
            </div>
          )}

          {selectedMethod === 'ble' && (
            <div className="text-center">
              <Bluetooth className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Bluetooth Proximity</h3>
              <p className="text-gray-600 mb-4">Make sure Bluetooth is enabled</p>
              <button
                onClick={handleAttendance}
                disabled={isScanning}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isScanning ? 'Detecting...' : 'Start Detection'}
              </button>
            </div>
          )}

          {selectedMethod === 'face' && (
            <div className="text-center">
              <h3 className="font-bold text-gray-900 mb-2">Face Recognition</h3>
              <p className="text-gray-600 mb-4">Position your face within the frame</p>
              <div className="w-64 h-48 bg-gray-200 rounded-lg mx-auto mb-4">
                <video ref={videoRef} className="w-full h-full rounded-lg object-cover" />
              </div>
              <button
                onClick={startFaceRecognition}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors mr-2"
              >
                Start Camera
              </button>
              <button
                onClick={handleAttendance}
                disabled={isScanning}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isScanning ? 'Verifying...' : 'Verify Face'}
              </button>
            </div>
          )}

          {selectedMethod === 'manual' && (
            <div className="text-center">
              <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Manual Check-in</h3>
              <p className="text-gray-600 mb-4">Tap to mark attendance manually</p>
              <button
                onClick={handleAttendance}
                disabled={isScanning}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {isScanning ? 'Processing...' : 'Mark Present'}
              </button>
            </div>
          )}
        </div>

        {/* Status Display */}
        {attendanceStatus !== 'idle' && (
          <div className={`mt-4 p-4 rounded-lg flex items-center space-x-3 ${
            attendanceStatus === 'success' ? 'bg-green-50 text-green-800' :
            attendanceStatus === 'error' ? 'bg-red-50 text-red-800' :
            'bg-blue-50 text-blue-800'
          }`}>
            {attendanceStatus === 'success' && <CheckCircle className="w-5 h-5" />}
            {attendanceStatus === 'error' && <AlertCircle className="w-5 h-5" />}
            {attendanceStatus === 'processing' && <Clock className="w-5 h-5" />}
            <span className="font-medium">
              {attendanceStatus === 'success' && 'Attendance marked successfully!'}
              {attendanceStatus === 'error' && 'Failed to mark attendance. Please try again.'}
              {attendanceStatus === 'processing' && 'Processing attendance...'}
            </span>
          </div>
        )}

        {/* Verification Layers */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Geofencing: {location ? 'Active' : 'Pending'}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Time Window: Valid</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Smartphone className="w-4 h-4" />
            <span>Device Check: Verified</span>
          </div>
        </div>
      </div>

      {/* Today's Attendance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Attendance</h2>
        <div className="space-y-3">
          {todayAttendance.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{record.subject}</h3>
                <p className="text-sm text-gray-600">{record.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                {record.method && (
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                    {record.method.toUpperCase()}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  record.status === 'present' ? 'bg-green-100 text-green-800' :
                  record.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {record.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}