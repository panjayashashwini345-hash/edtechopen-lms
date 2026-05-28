'use client';

import { useState, useEffect } from 'react';
import { User, UserRole, mockUsers, mockCourses, mockAssignments, mockFees, mockAttendance, mockForumPosts, mockCertificates, mockNotifications, mockLiveClasses, mockBatches } from '@/lib/mock-data';
import { AppProvider, useAppContext } from '@/contexts/AppContext';
import Landing from '@/components/pages/Landing';
import Dashboard from '@/components/pages/Dashboard';
import Courses from '@/components/pages/Courses';
import CourseDetail from '@/components/pages/CourseDetail';
import LiveClasses from '@/components/pages/LiveClasses';
import Batches from '@/components/pages/Batches';
import Assignments from '@/components/pages/Assignments';
import Fees from '@/components/pages/Fees';
import PaymentHistory from '@/components/pages/PaymentHistory';
import Attendance from '@/components/pages/Attendance';
import Community from '@/components/pages/Community';
import Certificates from '@/components/pages/Certificates';
import Notifications from '@/components/pages/Notifications';
import Settings from '@/components/pages/Settings';
import Navigation from '@/components/common/Navigation';
import LoginModal from '@/components/modals/LoginModal';
import Toast from '@/components/ui/toast-notification';

type PageType =
  | 'landing'
  | 'dashboard'
  | 'courses'
  | 'course-detail'
  | 'live-classes'
  | 'batches'
  | 'assignments'
  | 'fees'
  | 'payment-history'
  | 'attendance'
  | 'community'
  | 'certificates'
  | 'notifications'
  | 'settings';

function PageContent() {
  const { user, setUser, showToast } = useAppContext();
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
    setLoading(false);
  }, [setUser]);

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // Any email/password combination works in demo mode
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      password,
      name: role === 'student' ? 'Alex Johnson' : role === 'instructor' ? 'Prof. Sarah Smith' : 'Admin User',
      role,
      avatar: role === 'student' ? '👤' : role === 'instructor' ? '👨‍🏫' : '👨‍💼',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setCurrentPage('dashboard');
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedCourseId('');
    localStorage.removeItem('auth_user');
    setCurrentPage('landing');
  };

  const handleNavigate = (page: PageType, courseId?: string) => {
    if (courseId) setSelectedCourseId(courseId);
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  const renderPage = () => {
    if (!user && currentPage !== 'landing') {
      return <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
    }

    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'dashboard':
        return user ? <Dashboard user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'courses':
        return user ? <Courses user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'course-detail':
        return user ? <CourseDetail courseId={selectedCourseId} user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'live-classes':
        return user ? <LiveClasses user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'batches':
        return user ? <Batches user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'assignments':
        return user ? <Assignments user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'fees':
        return user ? <Fees user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'payment-history':
        return user ? <PaymentHistory user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'attendance':
        return user ? <Attendance user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'community':
        return user ? <Community user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'certificates':
        return user ? <Certificates user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'notifications':
        return user ? <Notifications user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      case 'settings':
        return user ? <Settings user={user} onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
      default:
        return <Landing onNavigate={handleNavigate} onOpenLoginModal={handleOpenLoginModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {user && <Navigation currentPage={currentPage} user={user} onNavigate={handleNavigate} onLogout={handleLogout} />}
      <main className={`fade-in ${user ? 'ml-64' : ''}`}>{renderPage()}</main>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      {user && <Toast />}
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <PageContent />
    </AppProvider>
  );
}
