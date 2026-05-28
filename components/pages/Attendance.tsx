'use client';

import { useState } from 'react';
import { User, mockAttendance } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AttendanceProps {
  user: User;
  onNavigate: (page: any) => void;
}

const indianStudents = ['Arjun Kumar', 'Priya Singh', 'Rahul Patel', 'Sneha Sharma', 'Rohan Gupta'];

export default function Attendance({ user, onNavigate }: AttendanceProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const present = mockAttendance.filter((a) => a.status === 'present').length;
  const absent = mockAttendance.filter((a) => a.status === 'absent').length;
  const percentageNum = (present / mockAttendance.length) * 100;
  const percentage = percentageNum.toFixed(1);

  // Generate calendar heatmap for month
  const generateHeatmap = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const weeks = [];
    let currentWeek = Array(startingDayOfWeek).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const attendance = mockAttendance.find((a) => a.date === dateStr);
      currentWeek.push({
        day,
        status: attendance?.status || null,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      currentWeek.push(...Array(7 - currentWeek.length).fill(null));
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const getStatusColor = (status: string | null) => {
    if (status === 'present') return 'bg-green-600';
    if (status === 'absent') return 'bg-red-600';
    return 'bg-slate-700';
  };

  const heatmapWeeks = generateHeatmap();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Attendance</h1>
          <p className="text-slate-400">Track your attendance and performance</p>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Classes Held', value: '45', color: 'bg-blue-600' },
            { label: 'Present', value: present.toString(), color: 'bg-green-600' },
            { label: 'Absent', value: absent.toString(), color: 'bg-red-600' },
            { label: 'Attendance Rate', value: `${percentage}%`, color: `${percentageNum > 75 ? 'bg-green-600' : percentageNum > 60 ? 'bg-yellow-600' : 'bg-red-600'}` },
          ].map((stat, idx) => (
            <Card key={idx} className="border-slate-700 bg-slate-900 p-6">
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold mt-2 ${stat.color.includes('green') ? 'text-green-400' : stat.color.includes('red') ? 'text-red-400' : stat.color.includes('yellow') ? 'text-yellow-400' : 'text-blue-400'}`}>
                {stat.value}
              </p>
            </Card>
          ))}
        </div>

        {/* Heatmap Calendar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Attendance Heatmap</h2>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
            />
          </div>

          <Card className="border-slate-700 bg-slate-900 p-6">
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-slate-400 text-sm font-semibold">
                  {day}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="grid grid-cols-7 gap-2">
              {heatmapWeeks.map((week, weekIdx) =>
                week.map((day, dayIdx) => (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center text-sm font-semibold
                      ${day ? getStatusColor(day.status) : 'bg-slate-800 opacity-20'}
                      ${day && day.status === 'present' ? 'text-white' : day && day.status === 'absent' ? 'text-white' : 'text-slate-600'}
                    `}
                  >
                    {day?.day}
                  </div>
                ))
              )}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-6 justify-center flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span className="text-sm text-slate-400">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="text-sm text-slate-400">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-700 rounded"></div>
                <span className="text-sm text-slate-400">No Class</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Attendance Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Attendance Details</h2>
          <Card className="border-slate-700 bg-slate-900 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-4 text-slate-400">Name</th>
                    <th className="text-center p-4 text-slate-400">Mon</th>
                    <th className="text-center p-4 text-slate-400">Tue</th>
                    <th className="text-center p-4 text-slate-400">Wed</th>
                    <th className="text-center p-4 text-slate-400">Thu</th>
                    <th className="text-center p-4 text-slate-400">Fri</th>
                    <th className="text-center p-4 text-slate-400">%</th>
                    <th className="text-center p-4 text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {indianStudents.map((student, idx) => {
                    const studentAttendance = Math.floor(60 + Math.random() * 40);
                    const status = studentAttendance > 75 ? 'Good' : studentAttendance > 60 ? 'Average' : 'At Risk';
                    const statusColor = status === 'Good' ? 'bg-green-600' : status === 'Average' ? 'bg-yellow-600' : 'bg-red-600';

                    return (
                      <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800 transition">
                        <td className="p-4 text-white font-semibold">{student}</td>
                        <td className="text-center p-4">
                          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">✓</span>
                        </td>
                        <td className="text-center p-4">
                          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">✓</span>
                        </td>
                        <td className="text-center p-4">
                          <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">✗</span>
                        </td>
                        <td className="text-center p-4">
                          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">✓</span>
                        </td>
                        <td className="text-center p-4">
                          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">✓</span>
                        </td>
                        <td className="text-center p-4 font-bold text-orange-400">{studentAttendance}%</td>
                        <td className="text-center p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
