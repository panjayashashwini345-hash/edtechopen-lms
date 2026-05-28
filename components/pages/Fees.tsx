import { User, mockFees } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeesProps {
  user: User;
  onNavigate: (page: any) => void;
}

export default function Fees({ user, onNavigate }: FeesProps) {
  const totalPending = mockFees.filter((f) => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = mockFees.filter((f) => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white">Fees Management</h1>

        {/* Summary Cards */}
        {user.role === 'student' && (
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Total Paid', value: `₹${totalPaid}`, color: 'green' },
              { label: 'Pending Amount', value: `₹${totalPending}`, color: 'yellow' },
              { label: 'Total Fees', value: `₹${totalPaid + totalPending}`, color: 'blue' },
            ].map((stat, idx) => (
              <Card key={idx} className="border-slate-700 bg-slate-900">
                <CardContent className="pt-6">
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${stat.color === 'green' ? 'text-green-400' : stat.color === 'yellow' ? 'text-yellow-400' : 'text-blue-400'}`}>
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Fees Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Fee Details</h2>
          <div className="space-y-3">
            {mockFees.map((fee) => (
              <Card key={fee.id} className="border-slate-700 bg-slate-900">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Description</p>
                      <p className="text-white font-semibold">{fee.description}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Amount</p>
                      <p className="text-white font-semibold">₹{fee.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Due Date</p>
                      <p className="text-white">{fee.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Status</p>
                      <span
                        className={`text-sm px-2 py-1 rounded font-semibold ${
                          fee.status === 'paid'
                            ? 'bg-green-600 text-white'
                            : fee.status === 'pending'
                              ? 'bg-yellow-600 text-white'
                              : 'bg-red-600 text-white'
                        }`}
                      >
                        {fee.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-end">
                      {fee.status === 'pending' && user.role === 'student' && (
                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-sm">Pay Now</Button>
                      )}
                      {fee.status === 'paid' && <span className="text-green-400 text-sm">✓ Paid on {fee.paymentDate}</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment History */}
        {user.role === 'student' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Payment History</h2>
            <Card className="border-slate-700 bg-slate-900">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {mockFees
                    .filter((f) => f.status === 'paid')
                    .map((fee, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded">
                        <div>
                          <p className="text-white font-semibold">{fee.description}</p>
                          <p className="text-xs text-slate-400">{fee.paymentDate}</p>
                        </div>
                        <p className="text-green-400 font-bold">+₹{fee.amount}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
