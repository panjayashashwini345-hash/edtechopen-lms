'use client';

import { useState } from 'react';
import { User, mockChatMessages } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

interface CommunityProps {
  user: User;
  onNavigate: (page: any) => void;
}

const groups = [
  { id: '1', name: 'Batch 2024-A', icon: '👥', unread: 3 },
  { id: '2', name: 'Full Stack Cohort', icon: '💻', unread: 0 },
  { id: '3', name: 'ML Study Group', icon: '🤖', unread: 5 },
  { id: '4', name: 'Doubt Clearing', icon: '❓', unread: 2 },
  { id: '5', name: 'General Chat', icon: '💬', unread: 0 },
  { id: '6', name: 'Placement Prep', icon: '🏆', unread: 1 },
];

export default function Community({ user, onNavigate }: CommunityProps) {
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [onlineCount, setOnlineCount] = useState(12);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: `msg${messages.length + 1}`,
          userId: user.id,
          username: 'You',
          avatar: user.avatar,
          message: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex gap-6">
        {/* Left Panel - Groups */}
        <div className="w-64 bg-slate-900 rounded-lg border border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-bold text-white">Groups</h2>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 p-3">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  selectedGroup.id === group.id
                    ? 'bg-orange-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-xl">{group.icon}</span>
                <span className="flex-1 text-left truncate">{group.name}</span>
                {group.unread > 0 && (
                  <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                    {group.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div className="flex-1 bg-slate-900 rounded-lg border border-slate-700 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">{selectedGroup.name}</h2>
              <p className="text-sm text-slate-400">{onlineCount} members online</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400">
                ℹ️
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400">
                🔔
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
              >
                {!msg.isOwn && (
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-sm flex-shrink-0">
                    {msg.avatar}
                  </div>
                )}
                <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                  <p className={`text-xs font-semibold ${msg.isOwn ? 'text-orange-400' : 'text-slate-300'}`}>
                    {msg.username}
                  </p>
                  <div
                    className={`mt-1 px-4 py-2 rounded-lg max-w-xs ${
                      msg.isOwn
                        ? 'bg-orange-600 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-3">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400">
                😊
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400">
                📎
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-orange-600 hover:bg-orange-700 px-6"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
