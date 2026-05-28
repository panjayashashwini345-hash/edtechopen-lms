'use client';

import { useState } from 'react';
import { User, mockNotifications } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NotificationsProps {
  user: User;
  onNavigate: (page: any) => void;
}

type FilterType = 'All' | 'Fees' | 'Assignments' | 'Classes' | 'System';

export default function Notifications({ user, onNavigate }: NotificationsProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());

  const filterOptions: FilterType[] = ['All', 'Fees', 'Assignments', 'Classes', 'System'];

  const filteredNotifications = mockNotifications.filter((notif) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Fees') return notif.type === 'fee';
    if (selectedFilter === 'Assignments') return notif.type === 'assignment';
    if (selectedFilter === 'Classes') return notif.type === 'class';
    return notif.type === 'announcement' || notif.type === 'message';
  });

  const unreadCount = mockNotifications.filter((n) => !readNotifications.has(n.id)).length;

  const handleMarkAsRead = (notifId: string) => {
    setReadNotifications((prev) => new Set([...prev, notifId]));
  };

  const handleMarkAllAsRead = () => {
    setReadNotifications(new Set(mockNotifications.map((n) => n.id)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-slate-400">{unreadCount} unread notifications</p>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={handleMarkAllAsRead}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                selectedFilter === filter
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const isRead = readNotifications.has(notif.id);
              return (
                <Card
                  key={notif.id}
                  onClick={() => handleMarkAsRead(notif.id)}
                  className={`border-l-4 cursor-pointer transition hover:shadow-lg ${
                    isRead
                      ? 'border-slate-700 bg-slate-900'
                      : 'border-l-orange-500 bg-slate-800 hover:border-orange-400'
                  }`}
                >
                  <div className="p-4 flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-2xl flex-shrink-0">{notif.icon}</div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{notif.title}</h3>
                      <p className={`text-sm mt-1 ${isRead ? 'text-slate-500' : 'text-slate-400'}`}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-slate-600 mt-2">
                        {new Date(notif.createdAt).toLocaleDateString()} at{' '}
                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {/* Unread Indicator */}
                    {!isRead && (
                      <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="border-slate-700 bg-slate-900 p-8">
              <div className="text-center">
                <p className="text-2xl mb-2">🔔</p>
                <p className="text-slate-400">No notifications for this filter</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
