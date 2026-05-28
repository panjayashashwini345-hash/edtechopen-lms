import { User, mockAssignments } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AssignmentsProps {
  user: User;
  onNavigate: (page: any) => void;
}

export default function Assignments({ user, onNavigate }: AssignmentsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white">Assignments</h1>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
              All Assignments
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-blue-600">
              Pending
            </TabsTrigger>
            <TabsTrigger value="submitted" className="data-[state=active]:bg-blue-600">
              Submitted
            </TabsTrigger>
            {user.role === 'instructor' && (
              <TabsTrigger value="grading" className="data-[state=active]:bg-blue-600">
                Pending Grading
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockAssignments.map((assignment) => (
              <Card key={assignment.id} className="border-slate-700 bg-slate-900">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">{assignment.title}</CardTitle>
                      <p className="text-sm text-slate-400 mt-2">{assignment.description}</p>
                    </div>
                    <span className="text-lg font-bold text-blue-400">100 pts</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Due Date</p>
                      <p className="text-white font-semibold">{assignment.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Max Score</p>
                      <p className="text-white font-semibold">{assignment.maxScore} points</p>
                    </div>
                  </div>

                  {user.role === 'student' && assignment.submissions && assignment.submissions.length > 0 && (
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-slate-400 mb-2">Your Submission</p>
                      <p className="text-white mb-2">Score: <span className="font-bold text-green-400">{assignment.submissions[0].score}/100</span></p>
                      <p className="text-slate-300 text-sm mb-2">Feedback: {assignment.submissions[0].feedback}</p>
                      <p className="text-xs text-slate-400">Submitted: {assignment.submissions[0].submittedAt}</p>
                    </div>
                  )}

                  {user.role === 'student' && (!assignment.submissions || assignment.submissions.length === 0) && (
                    <Button className="w-full bg-green-600 hover:bg-green-700">Submit Assignment</Button>
                  )}

                  {user.role === 'instructor' && (
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">View Submissions</Button>
                      <Button className="flex-1 bg-slate-700 hover:bg-slate-600">Edit</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="text-slate-400">
            {mockAssignments.filter((a) => !a.submissions || a.submissions.length === 0).length > 0 ? (
              <div className="space-y-4">
                {mockAssignments
                  .filter((a) => !a.submissions || a.submissions.length === 0)
                  .map((assignment) => (
                    <Card key={assignment.id} className="border-slate-700 bg-slate-900">
                      <CardContent className="pt-6">
                        <p className="font-semibold text-white">{assignment.title}</p>
                        <p className="text-sm text-slate-400 mt-1">Due: {assignment.dueDate}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card className="border-slate-700 bg-slate-900">
                <CardContent className="pt-6 text-center">
                  <p className="text-slate-400">No pending assignments</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="submitted">
            {mockAssignments.filter((a) => a.submissions && a.submissions.length > 0).length > 0 ? (
              <div className="space-y-4">
                {mockAssignments
                  .filter((a) => a.submissions && a.submissions.length > 0)
                  .map((assignment) => (
                    <Card key={assignment.id} className="border-slate-700 bg-slate-900">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-white">{assignment.title}</p>
                            <p className="text-sm text-slate-400 mt-1">Score: {assignment.submissions![0].score}/100</p>
                          </div>
                          <span className="bg-green-600 px-3 py-1 rounded text-sm">✓ Submitted</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card className="border-slate-700 bg-slate-900">
                <CardContent className="pt-6 text-center">
                  <p className="text-slate-400">No submitted assignments yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
