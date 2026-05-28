'use client';

import { useState } from 'react';
import { User, mockLiveClasses } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LiveClassesProps {
  user: User;
  onNavigate: (page: any) => void;
}

type FilterType = 'All' | 'Live Now' | 'Upcoming' | 'Completed';

export default function LiveClasses({ user, onNavigate }: LiveClassesProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const filterOptions: FilterType[] = ['All', 'Live Now', 'Upcoming', 'Completed'];

  const getStatusBadge = (status: string) => {
    if (status === 'live') return 'Live 🔴';
    if (status === 'upcoming') return 'Upcoming';
    return 'Completed';
  };

  const filterClasses = mockLiveClasses.filter((cls) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Live Now') return cls.status === 'live';
    if (selectedFilter === 'Upcoming') return cls.status === 'scheduled';
    return cls.status === 'completed';
  });

  const handleJoinClass = (classId: string) => {
    setSelectedClass(classId);
  };

  if (selectedClass) {
    const liveClass = mockLiveClasses.find((c) => c.id === selectedClass);
    if (!liveClass) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-6xl space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center text-white">
            <h2 className="text-2xl font-bold">{liveClass.title}</h2>
            <button
              onClick={() => setSelectedClass(null)}
              className="text-2xl hover:text-orange-500 transition"
            >
              ✕
            </button>
          </div>

          {/* Video Area with Participants */}
          <div className="bg-black rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { name: 'You', avatar: '👤' },
                { name: 'Rahul', avatar: '👨' },
                { name: 'Priya', avatar: '👩' },
                { name: 'Arjun', avatar: '👨' },
              ].map((participant) => (
                <div key={participant.name} className="bg-slate-900 rounded-lg h-40 flex flex-col items-center justify-center">
                  <div className="text-6xl mb-2 rounded-full w-16 h-16 flex items-center justify-center bg-orange-600">
                    {participant.avatar}
                  </div>
                  <p className="text-white font-semibold text-sm">{participant.name}</p>
                </div>
              ))}
            </div>

            {/* Live Timer */}
            <div className="text-center text-white mb-4">
              <p className="text-lg font-semibold">Duration: <span className="text-orange-500">00:45</span></p>
            </div>

            {/* Toolbar */}
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition">
                🎤 Mute
              </button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition">
                📷 Camera
              </button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition">
                🖥️ Share
              </button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition">
                💬 Chat
              </button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition">
                👥 Participants
              </button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition">
                ✋ Raise Hand
              </button>
              <button
                onClick={() => setSelectedClass(null)}
                className="p-3 bg-red-600 hover:bg-red-700 rounded-full text-white transition font-semibold"
              >
                🔴 Leave
              </button>
            </div>
          </div>

          {/* Chat Panel */}
          <div className="bg-slate-900 rounded-lg p-4 max-h-48 overflow-y-auto">
            <h3 className="text-white font-semibold mb-3">Chat</h3>
            <div className="space-y-3">
              {[
                { name: 'Instructor', msg: 'Today we will cover advanced React patterns' },
                { name: 'Rahul', msg: 'Looking forward to it!' },
                { name: 'Priya', msg: 'Can you share the code repo link?' },
              ].map((msg, idx) => (
                <div key={idx} className="text-sm">
                  <p className="text-orange-400 font-semibold">{msg.name}:</p>
                  <p className="text-slate-300">{msg.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Live Classes</h1>
          <p className="text-slate-400">Join live learning sessions with instructors and peers</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2">
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

        {/* Classes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filterClasses.map((liveClass) => (
            <Card
              key={liveClass.id}
              className={`border-l-4 ${
                liveClass.status === 'live' ? 'border-l-red-500' : 'border-l-blue-500'
              } border-slate-700 bg-slate-900 hover:border-orange-500 transition overflow-hidden`}
            >
              <div className="p-6 space-y-4">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${
                      liveClass.status === 'live'
                        ? 'text-red-400 animate-pulse'
                        : liveClass.status === 'scheduled'
                          ? 'text-blue-400'
                          : 'text-slate-400'
                    }`}
                  >
                    {getStatusBadge(liveClass.status)}
                  </span>
                  <span className="text-slate-500 text-sm">{liveClass.duration} min</span>
                </div>

                {/* Subject & Chapter */}
                <h3 className="text-lg font-bold text-white">{liveClass.title}</h3>

                {/* Instructor */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-lg">
                    {liveClass.instructor.avatar}
                  </div>
                  <p className="text-sm font-semibold text-white">{liveClass.instructor.name}</p>
                </div>

                {/* Date & Time */}
                <div className="text-sm text-slate-400 space-y-1">
                  <p>📅 {new Date(liveClass.scheduledTime).toLocaleDateString()}</p>
                  <p>🕐 {new Date(liveClass.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                {/* Student Count */}
                <p className="text-sm text-slate-400">👥 {liveClass.students.toLocaleString()} students</p>

                {/* Action Button */}
                <Button
                  onClick={() => handleJoinClass(liveClass.id)}
                  className={`w-full font-semibold ${
                    liveClass.status === 'live'
                      ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/50'
                      : liveClass.status === 'scheduled'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {liveClass.status === 'live'
                    ? 'Join Now'
                    : liveClass.status === 'scheduled'
                      ? 'Set Reminder'
                      : 'Watch Recording'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filterClasses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No classes found for this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
