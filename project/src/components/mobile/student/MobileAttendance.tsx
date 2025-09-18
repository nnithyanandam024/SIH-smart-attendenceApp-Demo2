import React, { useState, useRef } from 'react';
import { 
  QrCode, 
  Bluetooth, 
  Camera, 
  Smartphone,
  CheckCircle, 
  Clock,
  AlertCircle,
  MapPin,
  Zap
} from 'lucide-react';
import MobileLayout from '../MobileLayout';

export default function MobileAttendance() {
  const [selectedMethod, setSelectedMethod] = useState<'qr' | 'ble' | 'face' | 'manual'>('qr');
  const [isScanning, setIsScanning] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);

  const attendanceMethods = [
    { id: 'qr', name: 'QR Scan', icon: QrCode, color: 'bg-indigo-500' },
    { id: 'ble', name: 'Proximity', icon: Bluetooth, color: 'bg-blue-500' },
    { id: 'face', name: 'Face ID', icon: Camera, color: 'bg-green-500' },
    { id: 'manual', name: 'Manual', icon: Smartphone, color: 'bg-gray-500' }
  ];

  const todayAttendance = [
    { subject: 'Mathematics', status: 'present', time: '09:00', method: 'QR' },
    { subject: 'Physics', status: 'present', time: '10:15', method: 'BLE' },
    { subject: 'Computer Science', status: 'pending', time: '12:15', method: null }
  ];

  const handleAttendance = async () => {
    setIsScanning(true);
    setAttendanceStatus('processing');

    setTimeout(() => {
      setAttendanceStatus('success');
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
    <MobileLayout title="Attendance">
      <div className="p-4 space-y-6">
        {/* Method Selection */}
        <div className="grid grid-cols-2 gap-3">
          {attendanceMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${method.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-gray-900 text-sm">{method.name}</p>
              </button>
            );
          })}
        </div>

        {/* Scanner Interface */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {selectedMethod === 'qr' && (
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                {isScanning ? (
                  <div className="animate-pulse">
                    <div className="w-32 h-32 border-4 border-indigo-500 rounded-lg"></div>
                  </div>
                ) : (
                  <QrCode className="w-16 h-16 text-gray-400" />
                )}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">QR Code Scanner</h3>
              <p className="text-gray-600 text-sm mb-4">Position the QR code within the frame</p>
            </div>
          )}

          {selectedMethod === 'ble' && (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Bluetooth className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Bluetooth Proximity</h3>
              <p className="text-gray-600 text-sm mb-4">Make sure Bluetooth is enabled</p>
            </div>
          )}

          {selectedMethod === 'face' && (
            <div className="text-center">
              <div className="w-48 h-36 mx-auto mb-4 bg-gray-100 rounded-xl overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Face Recognition</h3>
              <p className="text-gray-600 text-sm mb-4">Position your face within the frame</p>
              <button
                onClick={startFaceRecognition}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm mb-2"
              >
                Start Camera
              </button>
            </div>
          )}

          {selectedMethod === 'manual' && (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Manual Check-in</h3>
              <p className="text-gray-600 text-sm mb-4">Tap to mark attendance manually</p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleAttendance}
            disabled={isScanning}
            className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScanning ? 'Processing...' : 'Mark Attendance'}
          </button>

          {/* Status Display */}
          {attendanceStatus !== 'idle' && (
            <div className={`mt-4 p-4 rounded-xl flex items-center space-x-3 ${
              attendanceStatus === 'success' ? 'bg-green-50 text-green-800' :
              attendanceStatus === 'error' ? 'bg-red-50 text-red-800' :
              'bg-blue-50 text-blue-800'
            }`}>
              {attendanceStatus === 'success' && <CheckCircle className="w-5 h-5" />}
              {attendanceStatus === 'error' && <AlertCircle className="w-5 h-5" />}
              {attendanceStatus === 'processing' && <Clock className="w-5 h-5" />}
              <span className="font-medium text-sm">
                {attendanceStatus === 'success' && 'Attendance marked successfully!'}
                {attendanceStatus === 'error' && 'Failed to mark attendance. Please try again.'}
                {attendanceStatus === 'processing' && 'Processing attendance...'}
              </span>
            </div>
          )}
        </div>

        {/* Verification Status */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-900 mb-3">Verification Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Location</span>
              </div>
              <span className="text-sm font-medium text-green-600">Verified</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Time Window</span>
              </div>
              <span className="text-sm font-medium text-green-600">Valid</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Device Check</span>
              </div>
              <span className="text-sm font-medium text-green-600">Verified</span>
            </div>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-900 mb-4">Today's Attendance</h3>
          <div className="space-y-3">
            {todayAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{record.subject}</h4>
                  <p className="text-xs text-gray-600">{record.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {record.method && (
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {record.method}
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
    </MobileLayout>
  );
}