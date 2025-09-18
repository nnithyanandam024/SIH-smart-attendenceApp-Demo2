export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent' | 'counselor';
  avatar?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  interests: string[];
  academicGoals: string[];
  languagePreference: string;
  gradeLevel?: string;
  section?: string;
  rollNumber?: string;
}

export interface TimeSlot {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'break' | 'free';
}

export interface Timetable {
  [key: string]: TimeSlot[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  method?: 'qr' | 'ble' | 'face' | 'manual';
  timestamp?: string;
  location?: { lat: number; lng: number };
}

export interface MovementPass {
  id: string;
  studentId: string;
  reason: string;
  destination: string;
  requestTime: string;
  validUntil: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  approvedBy?: string;
  location?: { lat: number; lng: number };
}

export interface Activity {
  id: string;
  title: string;
  type: 'study' | 'review' | 'practice' | 'social';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  description: string;
  dueDate?: string;
  completed?: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  members: string[];
  createdBy: string;
  scheduledTime?: string;
  location?: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
}