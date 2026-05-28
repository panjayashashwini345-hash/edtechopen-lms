'use client';

import { User } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PaymentHistoryProps {
  user: User;
  onNavigate: (page: any) => void;
}

export default function PaymentHistory({ user, onNavigate }: PaymentHistoryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Payment History</h1>
          <p className="text-slate-400">View all your transaction records</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Total Paid', value: '₹1,10,500', icon: '💰', color: 'from-green-600 to-green-700' },
            { label: 'Total Transactions', value: '8', icon: '📊', color: 'from-blue-600 to-blue-700' },
            { label: 'Most Used Method', value: 'UPI', icon: '📱', color: 'from-purple-600 to-purple-700' },
          ].map((stat, idx) => (
            <Card key={idx} className={`border-0 bg-gradient-to-br ${stat.color}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Export */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm">
              <option>All Dates</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm">
              <option>All Courses</option>
              <option>React.js</option>
              <option>Python</option>
              <option>Web Design</option>
            </select>
            <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm">
              <option>All Methods</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Net Banking</option>
              <option>Wallet</option>
            </select>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            📥 Export CSV
          </Button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 text-slate-400 font-semibold">Transaction ID</th>
                <th className="text-left py-4 px-4 text-slate-400 font-semibold">Date & Time</th>
                <th className="text-left py-4 px-4 text-slate-400 font-semibold">Course</th>
                <th className="text-left py-4 px-4 text-slate-400 font-semibold">Method</th>
                <th className="text-left py-4 px-4 text-slate-400 font-semibold">Amount</th>
                <th className="text-left py-4 px-4 text-slate-400 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'TXN001234', date: 'May 20, 2024 10:30 AM', course: 'React.js', method: 'UPI', amount: '₹15,000', methodIcon: '📱' },
                { id: 'TXN001233', date: 'May 18, 2024 2:15 PM', course: 'Python Basics', method: 'Card', amount: '₹12,000', methodIcon: '💳' },
                { id: 'TXN001232', date: 'May 15, 2024 11:45 AM', course: 'Web Design', method: 'Net Banking', amount: '₹14,500', methodIcon: '🏦' },
                { id: 'TXN001231', date: 'May 12, 2024 3:20 PM', course: 'DSA Course', method: 'UPI', amount: '₹18,000', methodIcon: '📱' },
                { id: 'TXN001230', date: 'May 10, 2024 9:00 AM', course: 'React.js', method: 'Wallet', amount: '₹15,000', methodIcon: '👛' },
                { id: 'TXN001229', date: 'May 8, 2024 4:30 PM', course: 'Python Basics', method: 'Card', amount: '₹12,000', methodIcon: '💳' },
                { id: 'TXN001228', date: 'May 5, 2024 1:15 PM', course: 'Full Stack', method: 'UPI', amount: '₹16,000', methodIcon: '📱' },
                { id: 'TXN001227', date: 'May 1, 2024 10:45 AM', course: 'Web Design', method: 'Net Banking', amount: '₹14,500', methodIcon: '🏦' },
              ].map((transaction, idx) => (
                <tr key={idx} className="border-b border-slate-700 hover:bg-slate-800/50 transition">
                  <td className="py-4 px-4 text-white font-mono text-xs">{transaction.id}</td>
                  <td className="py-4 px-4 text-slate-400">{transaction.date}</td>
                  <td className="py-4 px-4 text-white">{transaction.course}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span>{transaction.methodIcon}</span>
                      <span className="text-slate-400">{transaction.method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white font-semibold">{transaction.amount}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                      ✓ Success
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
