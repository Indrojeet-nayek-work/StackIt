import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  MessageSquare,
  Flag,
  Trash2,
  Eye,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Shield,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 890234,
  totalQuestions: 2500432,
  totalAnswers: 15023451,
  reportedQuestions: 23,
  pendingReports: 15,
  resolvedReports: 8,
  activeUsers: 45234,
  questionsToday: 1234,
  answersToday: 8765,
};

const mockReportedQuestions = [
  {
    id: 1,
    title: "How to hack into someone's account?",
    author: "suspicious_user",
    reportedBy: "security_conscious",
    reason: "Inappropriate content",
    reportedAt: "2 hours ago",
    status: "pending",
    severity: "high",
  },
  {
    id: 2,
    title: "Spam question about selling fake products",
    author: "spammer123",
    reportedBy: "community_mod",
    reason: "Spam",
    reportedAt: "4 hours ago",
    status: "pending",
    severity: "medium",
  },
  {
    id: 3,
    title: "Offensive language and harassment",
    author: "troll_user",
    reportedBy: "victim_user",
    reason: "Harassment",
    reportedAt: "6 hours ago",
    status: "pending",
    severity: "high",
  },
  {
    id: 4,
    title: "Copyright violation - copied content",
    author: "copy_paste",
    reportedBy: "original_author",
    reason: "Copyright violation",
    reportedAt: "1 day ago",
    status: "resolved",
    severity: "medium",
  },
  {
    id: 5,
    title: "Off-topic question about cooking",
    author: "confused_user",
    reportedBy: "helpful_user",
    reason: "Off-topic",
    reportedAt: "2 days ago",
    status: "resolved",
    severity: "low",
  },
];

const mockRecentQuestions = [
  {
    id: 101,
    title: "How to implement authentication in React?",
    author: "john_doe",
    createdAt: "1 hour ago",
    votes: 15,
    answers: 8,
    views: 234,
    status: "active",
  },
  {
    id: 102,
    title: "TypeScript generics best practices",
    author: "sarah_dev",
    createdAt: "2 hours ago",
    votes: 23,
    answers: 5,
    views: 187,
    status: "active",
  },
  {
    id: 103,
    title: "Database design for e-commerce platform",
    author: "mike_architect",
    createdAt: "3 hours ago",
    votes: 31,
    answers: 12,
    views: 456,
    status: "active",
  },
];

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [reportedQuestions, setReportedQuestions] = useState(
    mockReportedQuestions,
  );

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleDeleteQuestion = (questionId: number) => {
    console.log("Deleting question:", questionId);
    // Implement delete logic here
  };

  const handleResolveReport = (
    reportId: number,
    action: "approve" | "dismiss",
  ) => {
    setReportedQuestions((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, status: "resolved" } : report,
      ),
    );
    console.log(`Report ${reportId} ${action}ed`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-8 w-8 text-reddit-orange" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Welcome, {user?.username}. Manage your community and keep StackIt
          safe.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{mockStats.activeUsers.toLocaleString()} active today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Questions
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.totalQuestions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{mockStats.questionsToday.toLocaleString()} today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Answers</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.totalAnswers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{mockStats.answersToday.toLocaleString()} today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reported Content
            </CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockStats.pendingReports}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockStats.reportedQuestions} total reports
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Reported Content
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            All Questions
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Reported Content Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Reported Questions ({mockStats.pendingReports} pending)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportedQuestions.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="max-w-xs">
                        <div className="truncate font-medium">
                          {report.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {report.reportedAt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.author}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{report.reportedBy}</Badge>
                      </TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {report.status === "pending" ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleResolveReport(report.id, "dismiss")
                                }
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Dismiss
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="destructive">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Question
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      question? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => {
                                        handleDeleteQuestion(report.id);
                                        handleResolveReport(
                                          report.id,
                                          "approve",
                                        );
                                      }}
                                      className="bg-destructive text-destructive-foreground"
                                    >
                                      Delete Question
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          ) : (
                            <Badge variant="outline" className="text-green-600">
                              Resolved
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Questions Tab */}
        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Questions Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRecentQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="max-w-xs">
                        <div className="truncate font-medium">
                          {question.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{question.author}</Badge>
                      </TableCell>
                      <TableCell>{question.createdAt}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{question.votes} votes</div>
                          <div>{question.answers} answers</div>
                          <div>{question.views} views</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600">
                          {question.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Question
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this question?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteQuestion(question.id)
                                  }
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete Question
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Questions posted today</span>
                    <Badge variant="secondary">
                      {mockStats.questionsToday.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Answers posted today</span>
                    <Badge variant="secondary">
                      {mockStats.answersToday.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active users today</span>
                    <Badge variant="secondary">
                      {mockStats.activeUsers.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reports submitted today</span>
                    <Badge variant="destructive">7</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Pending reports</span>
                    <Badge variant="destructive">
                      {mockStats.pendingReports}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Resolved reports</span>
                    <Badge variant="secondary">
                      {mockStats.resolvedReports}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Questions deleted this week</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Users banned this week</span>
                    <Badge variant="outline">3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
