import { User, mockCourses } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface CourseDetailProps {
  courseId: string;
  user: User;
  onNavigate: (page: any) => void;
}

export default function CourseDetail({ courseId, user, onNavigate }: CourseDetailProps) {
  const course = mockCourses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Course not found</h1>
          <Button onClick={() => onNavigate('courses')} className="mt-4">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Button variant="ghost" onClick={() => onNavigate('courses')} className="text-slate-400">
              ← Back to Courses
            </Button>
            <h1 className="text-4xl font-bold text-white">{course.title}</h1>
            <p className="text-slate-400">{course.description}</p>
          </div>
          <div className="text-7xl">{course.thumbnail}</div>
        </div>

        {/* Course Info */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Rating', value: `${course.rating} ⭐` },
            { label: 'Students', value: `${course.students}+` },
            { label: 'Category', value: course.category },
            { label: 'Progress', value: '67%' },
          ].map((info, idx) => (
            <Card key={idx} className="border-slate-700 bg-slate-900">
              <CardContent className="pt-4">
                <p className="text-sm text-slate-400">{info.label}</p>
                <p className="text-xl font-bold text-white">{info.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="modules" className="data-[state=active]:bg-blue-600">
              📚 Modules & Lessons
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-blue-600">
              📋 Details
            </TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-blue-600">
              ✍️ Assignments
            </TabsTrigger>
          </TabsList>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-4">
            {course.modules?.map((module) => (
              <Card key={module.id} className="border-slate-700 bg-slate-900">
                <CardHeader>
                  <CardTitle className="text-white">
                    Module {module.order}: {module.title}
                  </CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 transition">
                      <p className="text-white font-medium">▶ {lesson.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{lesson.duration} mins • {lesson.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <Card className="border-slate-700 bg-slate-900">
              <CardHeader>
                <CardTitle className="text-white">About This Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Course Description</h3>
                  <p className="text-slate-300">{course.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">What You&apos;ll Learn</h3>
                  <ul className="text-slate-300 space-y-1">
                    <li>✓ Fundamentals and best practices</li>
                    <li>✓ Advanced techniques and patterns</li>
                    <li>✓ Real-world applications</li>
                    <li>✓ Project-based learning</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            <Card className="border-slate-700 bg-slate-900">
              <CardHeader>
                <CardTitle className="text-white">Course Assignments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'Build a Todo App', dueDate: '2024-03-15', status: 'Submitted' },
                  { title: 'Create a Chat Application', dueDate: '2024-03-20', status: 'Pending' },
                  { title: 'Final Project', dueDate: '2024-04-01', status: 'Pending' },
                ].map((assignment, idx) => (
                  <div key={idx} className="p-3 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{assignment.title}</p>
                      <p className="text-xs text-slate-400">Due: {assignment.dueDate}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${assignment.status === 'Submitted' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                      {assignment.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
