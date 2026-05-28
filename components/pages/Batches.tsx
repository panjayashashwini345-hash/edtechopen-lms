'use client';

import { useState } from 'react';
import { User } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BatchesProps {
  user: User;
  onNavigate: (page: any) => void;
}

export default function Batches({ user, onNavigate }: BatchesProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const batches = [
    {
      id: '1',
      name: 'Batch 2024-A',
      course: 'Full Stack Development',
      students: 45,
      schedule: 'Mon Wed Fri 10AM',
      status: 'active',
      faculty: 'Prof. Ankit Sharma',
      startDate: 'Jan 15',
      endDate: 'Jun 15 2024',
    },
    {
      id: '2',
      name: 'Batch 2024-B',
      course: 'Data Science',
      students: 38,
      schedule: 'Tue Thu 2PM',
      status: 'active',
      faculty: 'Dr. Priya Menon',
      startDate: 'Feb 01',
      endDate: 'Jul 01 2024',
    },
    {
      id: '3',
      name: 'Batch 2023-C',
      course: 'Machine Learning',
      students: 32,
      schedule: 'Mon Wed 10AM',
      status: 'completed',
      faculty: 'Prof. Rajesh Kumar',
      startDate: 'Jan 10',
      endDate: 'Dec 10 2023',
    },
    {
      id: '4',
      name: 'Batch 2024-C',
      course: 'Cloud Computing',
      students: 0,
      schedule: 'Tue Thu Sat 11AM',
      status: 'upcoming',
      faculty: 'Prof. Sunita Iyer',
      startDate: 'Jun 01',
      endDate: 'Dec 01 2024',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400';
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Batch Management</h1>
            <p className="text-slate-400">View and manage all batches</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            + Create New Batch
          </Button>
        </div>

        {/* Batches Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {batches.map((batch) => (
            <Card key={batch.id} className="border-slate-700 bg-slate-900 hover:border-orange-500/50 transition">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{batch.name}</p>
                      <h3 className="text-xl font-semibold text-white mt-1">{batch.course}</h3>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(batch.status)}`}>
                      {getStatusLabel(batch.status)}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-700">
                    <div>
                      <p className="text-xs text-slate-500">Students</p>
                      <p className="text-lg font-semibold text-white">{batch.students}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Schedule</p>
                      <p className="text-sm text-white">{batch.schedule}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Faculty</p>
                      <p className="text-sm text-slate-300">{batch.faculty}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Duration</p>
                      <p className="text-sm text-slate-300">{batch.startDate} - {batch.endDate}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => {
                      setSelectedBatch(batch);
                      setShowDetailsModal(true);
                    }}
                    variant="outline"
                    className="w-full border-slate-600 hover:border-orange-500 hover:bg-orange-500/10"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Batch Modal */}
      {showCreateModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowCreateModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-slate-900 border-slate-700">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white">Create New Batch</h2>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Batch Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Batch 2024-D"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Course</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                        <option>Select Course</option>
                        <option>Full Stack Development</option>
                        <option>Data Science</option>
                        <option>Machine Learning</option>
                        <option>Cloud Computing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Faculty</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                        <option>Select Faculty</option>
                        <option>Prof. Ankit Sharma</option>
                        <option>Dr. Priya Menon</option>
                        <option>Prof. Rajesh Kumar</option>
                        <option>Prof. Sunita Iyer</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Max Students</label>
                      <input
                        type="number"
                        placeholder="50"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setShowCreateModal(false)}
                      variant="outline"
                      className="flex-1 border-slate-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setShowCreateModal(false);
                        // Show success toast
                      }}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Batch Details Modal */}
      {showDetailsModal && selectedBatch && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowDetailsModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-slate-900 border-slate-700 max-h-[80vh] overflow-y-auto">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">{selectedBatch.name}</h2>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Course</p>
                      <p className="text-white font-semibold">{selectedBatch.course}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Faculty</p>
                      <p className="text-white font-semibold">{selectedBatch.faculty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Total Students</p>
                      <p className="text-white font-semibold">{selectedBatch.students}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Status</p>
                      <span className={`text-sm px-3 py-1 rounded font-semibold ${getStatusColor(selectedBatch.status)}`}>
                        {getStatusLabel(selectedBatch.status)}
                      </span>
                    </div>
                  </div>

                  {/* Students Table */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Student List</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-700">
                            <th className="text-left py-2 px-3 text-slate-400 font-semibold">Name</th>
                            <th className="text-left py-2 px-3 text-slate-400 font-semibold">Email</th>
                            <th className="text-left py-2 px-3 text-slate-400 font-semibold">Progress</th>
                            <th className="text-left py-2 px-3 text-slate-400 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'Rahul Verma', email: 'rahul@example.com', progress: '85%', status: 'Active' },
                            { name: 'Priya Patel', email: 'priya@example.com', progress: '92%', status: 'Active' },
                            { name: 'Amit Kumar', email: 'amit@example.com', progress: '75%', status: 'Active' },
                            { name: 'Sneha Singh', email: 'sneha@example.com', progress: '88%', status: 'Active' },
                          ].map((student, idx) => (
                            <tr key={idx} className="border-b border-slate-700 hover:bg-slate-800/50">
                              <td className="py-3 px-3 text-white">{student.name}</td>
                              <td className="py-3 px-3 text-slate-400">{student.email}</td>
                              <td className="py-3 px-3">
                                <div className="h-1.5 bg-slate-700 rounded w-12">
                                  <div
                                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded"
                                    style={{ width: student.progress }}
                                  />
                                </div>
                              </td>
                              <td className="py-3 px-3 text-green-400">{student.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowDetailsModal(false)}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
