import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Edit,
  Save,
  X,
  MessageSquare,
  ArrowUp,
  Eye,
  Tag,
  Calendar,
  Award,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface UserQuestion {
  id: number;
  title: string;
  description: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  createdAt: string;
  hasAcceptedAnswer: boolean;
}

interface UserAnswer {
  id: number;
  questionId: number;
  questionTitle: string;
  content: string;
  votes: number;
  isAccepted: boolean;
  createdAt: string;
}

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Mock data - in a real app, this would come from an API
  const [userQuestions] = useState<UserQuestion[]>([
    {
      id: 1,
      title: "How to implement authentication in React?",
      description:
        "I'm trying to build a React application with user authentication...",
      votes: 15,
      answers: 8,
      views: 234,
      tags: ["React", "Authentication", "JWT"],
      createdAt: "2 hours ago",
      hasAcceptedAnswer: true,
    },
    {
      id: 2,
      title: "Best practices for state management in large React apps?",
      description:
        "Working on a large React application and looking for advice on state management...",
      votes: 12,
      answers: 5,
      views: 187,
      tags: ["React", "State Management", "Redux"],
      createdAt: "1 day ago",
      hasAcceptedAnswer: false,
    },
  ]);

  const [userAnswers] = useState<UserAnswer[]>([
    {
      id: 1,
      questionId: 3,
      questionTitle: "Database design for e-commerce platform",
      content:
        "For e-commerce platforms, I recommend starting with a normalized schema...",
      votes: 23,
      isAccepted: true,
      createdAt: "3 hours ago",
    },
    {
      id: 2,
      questionId: 4,
      questionTitle: "CSS Grid vs Flexbox - when to use which?",
      content:
        "CSS Grid is perfect for two-dimensional layouts, while Flexbox excels at one-dimensional...",
      votes: 8,
      isAccepted: false,
      createdAt: "1 day ago",
    },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      // Test notification for mobile
      setTimeout(() => {
        toast({
          title: "Welcome to your profile!",
          description: "Notifications are working correctly on mobile.",
        });
      }, 1000);
    }
  }, [isAuthenticated, navigate]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedUsername(user?.username || "");
    setEditedEmail(user?.email || "");
    setProfileImage(null);
    setIsEditing(false);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <p>Redirecting...</p>
      </div>
    );
  }

  const stats = {
    questions: userQuestions.length,
    answers: userAnswers.length,
    reputation:
      userQuestions.reduce((acc, q) => acc + q.votes, 0) +
      userAnswers.reduce((acc, a) => acc + a.votes, 0),
    acceptedAnswers: userAnswers.filter((a) => a.isAccepted).length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt="Profile" />
                  ) : (
                    <AvatarFallback className="text-2xl sm:text-3xl bg-reddit-orange text-white">
                      {user.avatar}
                    </AvatarFallback>
                  )}
                </Avatar>
                {isEditing && (
                  <label
                    htmlFor="profile-image"
                    className="absolute -bottom-2 -right-2 bg-reddit-orange text-white rounded-full p-2 cursor-pointer hover:bg-reddit-orange/90 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={cancelEdit} size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {user.username}
                    </h1>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {new Date().getFullYear()}</span>
                  </div>
                  {user.role === "admin" && (
                    <Badge className="bg-reddit-orange text-white">
                      Administrator
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 lg:w-48">
              <div className="text-center">
                <div className="text-2xl font-bold text-reddit-orange">
                  {stats.reputation}
                </div>
                <div className="text-sm text-muted-foreground">Reputation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.questions}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.answers}</div>
                <div className="text-sm text-muted-foreground">Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.acceptedAnswers}
                </div>
                <div className="text-sm text-muted-foreground">Accepted</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Tabs */}
      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-2">
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Questions ({stats.questions})
          </TabsTrigger>
          <TabsTrigger value="answers" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Answers ({stats.answers})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Your Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userQuestions.length > 0 ? (
                userQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0 sm:space-y-2 order-2 sm:order-1">
                        <div className="text-center">
                          <div className="text-lg font-semibold">
                            {question.votes}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            votes
                          </div>
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-lg font-semibold ${
                              question.hasAcceptedAnswer ? "text-green-600" : ""
                            }`}
                          >
                            {question.answers}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            answers
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">
                            {question.views}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            views
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 order-1 sm:order-2">
                        <h3 className="font-semibold text-reddit-orange hover:underline cursor-pointer mb-2">
                          {question.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {question.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {question.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Asked {question.createdAt}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>You haven't asked any questions yet.</p>
                  <Button className="mt-4" asChild>
                    <a href="/ask">Ask Your First Question</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="answers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Your Answers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userAnswers.length > 0 ? (
                userAnswers.map((answer) => (
                  <div
                    key={answer.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0 sm:space-y-2 order-2 sm:order-1">
                        <div className="text-center">
                          <div className="text-lg font-semibold flex items-center gap-1">
                            <ArrowUp className="h-4 w-4 text-green-600" />
                            {answer.votes}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            votes
                          </div>
                        </div>
                        {answer.isAccepted && (
                          <div className="text-center">
                            <div className="text-lg font-semibold text-green-600">
                              ✓
                            </div>
                            <div className="text-xs text-muted-foreground">
                              accepted
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 order-1 sm:order-2">
                        <div className="mb-2">
                          <h3 className="font-semibold text-reddit-orange hover:underline cursor-pointer text-sm mb-1">
                            {answer.questionTitle}
                          </h3>
                          {answer.isAccepted && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <Award className="h-3 w-3 mr-1" />
                              Accepted Answer
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {answer.content}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          Answered {answer.createdAt}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>You haven't answered any questions yet.</p>
                  <Button className="mt-4" asChild>
                    <a href="/questions">Browse Questions</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
