'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/lib/mock-data';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserName: (firstName: string, lastName: string) => void;
  updateUserAvatar: (avatarColor: string) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const updateUserName = (firstName: string, lastName: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        name: `${firstName} ${lastName}`,
      };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  const updateUserAvatar = (avatarColor: string) => {
    if (user) {
      const avatarMap: Record<string, string> = {
        orange: '🟠',
        blue: '🔵',
        green: '🟢',
        purple: '🟣',
        red: '🔴',
        yellow: '🟡',
      };
      const updatedUser = {
        ...user,
        avatar: avatarMap[avatarColor] || user.avatar,
      };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppContext.Provider value={{ user, setUser, updateUserName, updateUserAvatar, showToast, toast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
