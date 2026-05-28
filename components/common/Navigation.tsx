import { User } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

interface NavigationProps {
  currentPage: string;
  user: User;
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export default function Navigation({ currentPage, user, onNavigate, onLogout }: NavigationProps) {
  const { user: contextUser } = useAppContext();
  const displayUser = contextUser || user;

  const isActive = (page: string) => currentPage === page ? 'bg-orange-600 text-white' : 'text-slate-300 hover:text-white';

  type MenuItem = { label: string; page: string };

  const commonMenuItems: MenuItem[] = [
    { label: '🏠 Dashboard', page: 'dashboard' },
    { label: '📚 Courses', page: 'courses' },
    { label: '🎥 Live Classes', page: 'live-classes' },
  ];

  const studentMenuItems: MenuItem[] = [
    { label: '👥 Batches', page: 'batches' },
    { label: '📝 Assignments', page: 'assignments' },
    { label: '💰 Fees', page: 'fees' },
    { label: '💳 Payment History', page: 'payment-history' },
    { label: '📊 Attendance', page: 'attendance' },
  ];

  const instructorMenuItems: MenuItem[] = [
    { label: '👥 Batches', page: 'batches' },
    { label: '📝 Assignments', page: 'assignments' },
    { label: '💰 Fees', page: 'fees' },
    { label: '📊 Attendance', page: 'attendance' },
  ];

  const adminMenuItems: MenuItem[] = [
    { label: '👥 Batches', page: 'batches' },
    { label: '💰 Fees', page: 'fees' },
    { label: '💳 Payment History', page: 'payment-history' },
    { label: '📊 Attendance', page: 'attendance' },
  ];

  const commonFooterItems: MenuItem[] = [
    { label: '💬 Community', page: 'community' },
    { label: '🔔 Notifications', page: 'notifications' },
    { label: '🏆 Certificates', page: 'certificates' },
    { label: '⚙️ Settings', page: 'settings' },
  ];

  let roleMenuItems: MenuItem[] = [];
  if (displayUser.role === 'student') roleMenuItems = studentMenuItems;
  else if (displayUser.role === 'instructor') roleMenuItems = instructorMenuItems;
  else if (displayUser.role === 'admin') roleMenuItems = adminMenuItems;

  const allMenuItems = [...commonMenuItems, ...roleMenuItems];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-700 bg-slate-900 flex flex-col">
      {/* Logo */}
      <div className="border-b border-slate-700 p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <div className="text-2xl font-bold text-orange-500">EdTechOpen</div>
        </div>
        <p className="text-xs text-slate-500 mt-1">{displayUser.role.charAt(0).toUpperCase() + displayUser.role.slice(1)}</p>
      </div>

      {/* User Info */}
      <div className="border-b border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{displayUser.avatar || '👤'}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{displayUser.name}</p>
            <p className="text-xs text-slate-400 truncate">{displayUser.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {allMenuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page as any)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${isActive(item.page)}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Footer Items Section */}
        <div className="mt-8 pt-4 border-t border-slate-700 space-y-2">
          {commonFooterItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page as any)}
              className={`w-full text-left px-4 py-2 rounded-lg transition text-sm ${isActive(item.page)}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="border-t border-slate-700 p-4">
        <Button onClick={onLogout} variant="destructive" className="w-full">
          Logout
        </Button>
      </div>
    </aside>
  );
}
