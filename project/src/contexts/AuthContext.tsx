import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: User['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.student@school.edu',
    role: 'student',
    profile: {
      interests: ['Mathematics', 'Physics', 'Computer Science'],
      academicGoals: ['Improve Math grades', 'Learn programming'],
      languagePreference: 'English',
      gradeLevel: '10th',
      section: 'A',
      rollNumber: '2024001'
    }
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.teacher@school.edu',
    role: 'teacher'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.admin@school.edu',
    role: 'admin'
  },
  {
    id: '4',
    name: 'Emily Johnson',
    email: 'emily.parent@gmail.com',
    role: 'parent'
  },
  {
    id: '5',
    name: 'Dr. Lisa Chen',
    email: 'lisa.counselor@school.edu',
    role: 'counselor'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const switchRole = (role: User['role']) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}