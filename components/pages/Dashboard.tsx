'use client';

import { User } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

interface DashboardProps {
  user: User;
  onNavigate: (page: any, courseId?: string) => void;
}

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  const { user: contextUser } = useAppContext();
  const displayUser = contextUser || user;

  if (displayUser.role === 'student') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section with Streak */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Hey <span className="text-orange-500">{displayUser.name.split(' ')[0]}</span>! 🚀 Ready to learn today?
            </h1>
            
            {/* Streak Banner */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg p-4 text-white flex items-center gap-4">
              <div className="text-3xl">🔥</div>
              <div>
                <p className="font-semibold">12 Day Streak! Keep it up!</p>
                <p className="text-sm opacity-90">You&apos;re on fire! Keep learning consistently</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'My Courses', value: '3', icon: '📚', color: 'from-blue-600 to-blue-700' },
              { label: 'Pending Assignments', value: '2', icon: '📝', color: 'from-purple-600 to-purple-700' },
              { label: 'Certificates Earned', value: '1', icon: '🏆', color: 'from-yellow-600 to-yellow-700' },
              { label: 'Attendance', value: '92%', icon: '📋', color: 'from-green-600 to-green-700' },
            ].map((stat, idx) => (
              <Card key={idx} className={`border-0 bg-gradient-to-br ${stat.color}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* My Courses Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">My Courses</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: 'React.js Fundamentals', progress: 65, icon: '🚀' },
                { title: 'Python Basics', progress: 40, icon: '🐍' },
                { title: 'Web Design', progress: 80, icon: '🎨' },
              ].map((course, idx) => (
                <Card key={idx} className="border-slate-700 bg-slate-900">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">{course.icon}</div>
                    <h3 className="font-semibold text-white mb-2">{course.title}</h3>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">{course.progress}% complete</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Today's Schedule & Deadlines */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Today's Schedule */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Today&apos;s Schedule</h3>
              <div className="space-y-3">
                {[
                  { time: '10:00 AM', class: 'React Advanced Concepts', instructor: 'Prof. Smith' },
                  { time: '2:00 PM', class: 'Python Data Structures', instructor: 'Dr. Johnson' },
                ].map((item, idx) => (
                  <Card key={idx} className="border-slate-700 bg-slate-900">
                    <CardContent className="pt-4">
                      <div className="flex gap-4">
                        <div className="text-2xl">🎬</div>
                        <div className="flex-1">
                          <p className="font-semibold text-white">{item.class}</p>
                          <p className="text-sm text-slate-400">{item.instructor}</p>
                          <p className="text-xs text-orange-500 mt-1">{item.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {[
                  { assignment: 'React Project', days: '2' },
                  { assignment: 'Python Quiz', days: '5' },
                ].map((item, idx) => (
                  <Card key={idx} className="border-yellow-500/30 bg-yellow-500/10">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-white">{item.assignment}</p>
                          <p className="text-sm text-yellow-500">{item.days} days left</p>
                        </div>
                        <div className="text-2xl">⏰</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user.role === 'instructor') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold text-white">
              Good Morning, <span className="text-orange-500">Prof. Sharma</span> 👋
            </h1>
            <p className="text-slate-400 mt-2">Here&apos;s your teaching dashboard</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'My Batches', value: '3', icon: '👥', color: 'from-blue-600 to-blue-700' },
              { label: 'Total Students', value: '145', icon: '👤', color: 'from-purple-600 to-purple-700' },
              { label: 'Pending to Grade', value: '8', icon: '📝', color: 'from-orange-600 to-orange-700' },
              { label: "Today's Classes", value: '2', icon: '🎬', color: 'from-green-600 to-green-700' },
            ].map((stat, idx) => (
              <Card key={idx} className={`border-0 bg-gradient-to-br ${stat.color}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* My Batches */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">My Batches</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { name: 'Batch 2024-A', course: 'Full Stack Development', students: '45' },
                { name: 'Batch 2024-B', course: 'Data Science', students: '38' },
                { name: 'Batch 2023-C', course: 'Machine Learning', students: '32' },
              ].map((batch, idx) => (
                <Card key={idx} className="border-slate-700 bg-slate-900">
                  <CardContent className="pt-6">
                    <p className="font-semibold text-white">{batch.name}</p>
                    <p className="text-sm text-slate-400 mt-1">{batch.course}</p>
                    <p className="text-xs text-orange-500 mt-2">{batch.students} Students</p>
                    <Button size="sm" className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Assignments to Grade */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Assignments to Grade</h2>
            <div className="space-y-3">
              {[
                { student: 'Rahul Verma', assignment: 'React Project', submitted: '2 hrs ago' },
                { student: 'Priya Patel', assignment: 'Python Quiz', submitted: '4 hrs ago' },
                { student: 'Amit Kumar', assignment: 'DSA Assignment', submitted: '1 day ago' },
                { student: 'Sneha Singh', assignment: 'Web Design Task', submitted: '2 days ago' },
              ].map((item, idx) => (
                <Card key={idx} className="border-slate-700 bg-slate-900">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{item.student}</p>
                        <p className="text-sm text-slate-400">{item.assignment}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.submitted}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-slate-600">
                        Grade
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user.role === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold text-white">
              Good Morning, <span className="text-orange-500">Admin</span> 👋
            </h1>
            <p className="text-slate-400 mt-2">Platform overview and management</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'Total Students', value: '12,450', change: '+12%', icon: '👥', color: 'from-blue-600 to-blue-700', changeBg: 'bg-blue-500/20' },
              { label: 'Active Courses', value: '48', change: '+3', icon: '📚', color: 'from-green-600 to-green-700', changeBg: 'bg-green-500/20' },
              { label: 'Monthly Revenue', value: '₹8,24,000', change: '-8%', icon: '💰', color: 'from-orange-600 to-orange-700', changeBg: 'bg-orange-500/20' },
              { label: 'Assignments Due', value: '13', change: '+5', icon: '📝', color: 'from-purple-600 to-purple-700', changeBg: 'bg-purple-500/20' },
            ].map((stat, idx) => (
              <Card key={idx} className={`border-0 bg-gradient-to-br ${stat.color} relative`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-white/80">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div>
                      <div className="text-3xl">{stat.icon}</div>
                      <p className={`text-xs font-semibold mt-2 px-2 py-1 rounded ${stat.changeBg} text-white`}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: '+ Add Student', icon: '👤', color: 'bg-blue-600 hover:bg-blue-700' },
              { label: '+ Create Course', icon: '📚', color: 'bg-green-600 hover:bg-green-700' },
              { label: '₹ Collect Fee', icon: '💳', color: 'bg-orange-600 hover:bg-orange-700' },
              { label: '📅 Schedule Class', icon: '🎬', color: 'bg-purple-600 hover:bg-purple-700' },
            ].map((action, idx) => (
              <Button
                key={idx}
                className={`${action.color} h-24 text-white flex flex-col items-center justify-center gap-2`}
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-sm font-semibold text-center">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { initials: 'RV', name: 'Rahul Verma', action: 'paid fees for React Course', time: '2 min ago' },
                  { initials: 'PP', name: 'Priya Patel', action: 'enrolled in ML Fundamentals', time: '15 min ago' },
                  { initials: 'AK', name: 'Amit Kumar', action: 'submitted DSA Assignment', time: '1 hr ago' },
                  { initials: 'SS', name: 'Sneha Singh', action: 'completed Python Basics', time: '2 hrs ago' },
                  { initials: 'AN', name: 'Arjun Nair', action: 'requested certificate', time: '3 hrs ago' },
                ].map((activity, idx) => (
                  <Card key={idx} className="border-slate-700 bg-slate-900">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm">
                          {activity.initials}
                        </div>
                        <div className="flex-1">
                          <p className="text-white"><span className="font-semibold">{activity.name}</span> {activity.action}</p>
                          <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Classes */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Upcoming Classes</h2>
              <div className="space-y-3">
                {[
                  { time: '10AM', class: 'Advanced Mathematics', instructor: 'Dr. Smith', badge: 'TODAY' },
                  { time: '2PM', class: 'Data Structures', instructor: 'Prof. Johnson', badge: 'TODAY' },
                  { time: '9AM', class: 'Web Development', instructor: 'Ms. Williams', badge: 'TOMORROW' },
                ].map((item, idx) => (
                  <Card key={idx} className="border-slate-700 bg-slate-900">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-white text-sm">{item.class}</p>
                          <p className="text-xs text-slate-400 mt-1">{item.instructor}</p>
                          <p className="text-xs text-orange-500 font-semibold mt-2">{item.time}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded font-semibold ${
                          item.badge === 'TODAY' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Top Students Table */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Top Students</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Rank</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Course</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Score</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Progress</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: '1', name: 'Rahul Verma', course: 'React.js', score: '98', progress: '95%', badge: '⭐' },
                    { rank: '2', name: 'Priya Patel', course: 'Python', score: '96', progress: '90%', badge: '⭐' },
                    { rank: '3', name: 'Amit Kumar', course: 'DSA', score: '94', progress: '88%', badge: '✓' },
                    { rank: '4', name: 'Sneha Singh', course: 'Web Design', score: '92', progress: '85%', badge: '✓' },
                    { rank: '5', name: 'Arjun Nair', course: 'DevOps', score: '90', progress: '82%', badge: '✓' },
                  ].map((student, idx) => (
                    <tr key={idx} className="border-b border-slate-700 hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4 text-white">{student.rank}</td>
                      <td className="py-3 px-4 text-white">{student.name}</td>
                      <td className="py-3 px-4 text-slate-400">{student.course}</td>
                      <td className="py-3 px-4 text-orange-500 font-semibold">{student.score}</td>
                      <td className="py-3 px-4 text-slate-400">{student.progress}</td>
                      <td className="py-3 px-4 text-lg">{student.badge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="text-white text-center py-20">Unknown role</div>;
}
