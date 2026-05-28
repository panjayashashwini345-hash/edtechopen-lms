'use client';

import { useAppContext } from '@/contexts/AppContext';

export default function Toast() {
  const { toast } = useAppContext();

  if (!toast) return null;

  const bgColor =
    toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
        {toast.type === 'success' && <span>✓</span>}
        {toast.type === 'error' && <span>✕</span>}
        {toast.type === 'info' && <span>ℹ</span>}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
