import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: any) => void;
}

export default function Login({ onLogin, onNavigate }: LoginProps) {
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    onLogin(email, password);
  };

  const quickLogin = (role: 'student' | 'instructor' | 'admin') => {
    const credentials = {
      student: { email: 'student@example.com', password: 'password123' },
      instructor: { email: 'instructor@example.com', password: 'password123' },
      admin: { email: 'admin@example.com', password: 'password123' },
    };
    onLogin(credentials[role].email, credentials[role].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border-slate-700 bg-slate-900">
          <CardHeader className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              EduHub
            </div>
            <CardTitle className="text-white">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded text-sm">{error}</div>}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 space-y-3 border-t border-slate-700 pt-6">
              <p className="text-center text-sm text-slate-400">Demo Credentials</p>
              <div className="grid gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => quickLogin('student')}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Student Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => quickLogin('instructor')}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Instructor Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => quickLogin('admin')}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Admin Demo
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-slate-400">
              <button
                type="button"
                onClick={() => onNavigate('landing')}
                className="text-blue-400 hover:text-blue-300"
              >
                Back to Home
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
