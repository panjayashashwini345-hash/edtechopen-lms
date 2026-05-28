import { Button } from '@/components/ui/button';

interface LandingProps {
  onNavigate: (page: any) => void;
  onOpenLoginModal: () => void;
}

export default function Landing({ onNavigate, onOpenLoginModal }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-800 px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <div className="text-2xl font-bold text-orange-500">EdTechOpen</div>
          </div>
          <Button onClick={onOpenLoginModal} className="bg-orange-600 hover:bg-orange-700">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="space-y-12 px-8 py-24">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
            Learn <span className="text-orange-500">Anything</span>, Anytime
          </h1>
          <p className="text-xl text-slate-300">
            Comprehensive learning management platform with courses, assignments, live classes, and community support
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={onOpenLoginModal} size="lg" className="bg-orange-600 hover:bg-orange-700">
              Get Started
            </Button>
            <Button onClick={onOpenLoginModal} size="lg" variant="outline">
              Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-12 px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: '📚 Courses', desc: 'Interactive courses with modules and lessons' },
              { title: '🎬 Live Classes', desc: 'Real-time learning with instructors' },
              { title: '✍️ Assignments', desc: 'Track submissions and get feedback' },
              { title: '💰 Fee Management', desc: 'Easy payment and tracking system' },
              { title: '📝 Attendance', desc: 'Digital attendance tracking' },
              { title: '🏆 Certificates', desc: 'Earn certificates upon completion' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-700 bg-slate-900 p-6 hover:border-orange-500 transition"
              >
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section className="space-y-12 px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">Popular Courses</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: '🚀', title: 'React.js Fundamentals', students: '1250+' },
              { icon: '📱', title: 'JavaScript Advanced', students: '980+' },
              { icon: '🎨', title: 'Web Design Fundamentals', students: '1500+' },
            ].map((course, idx) => (
              <div key={idx} className="rounded-lg border border-slate-700 bg-slate-900 p-8 hover:border-orange-500 transition">
                <div className="mb-4 text-5xl">{course.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-white">{course.title}</h3>
                <p className="text-sm text-slate-400">{course.students} students enrolled</p>
                <div className="mt-4 h-2 w-full bg-slate-800 rounded">
                  <div className="h-full w-3/4 bg-gradient-to-r from-orange-500 to-orange-600 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="space-y-12 px-8 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">Ready to Start Learning?</h2>
          <p className="mb-8 text-lg text-slate-300">Join thousands of students already learning on EdTechOpen</p>
          <Button onClick={onOpenLoginModal} size="lg" className="bg-orange-600 hover:bg-orange-700">
            Sign In Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-8 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-slate-400">
          <p>&copy; 2024 EdTechOpen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
