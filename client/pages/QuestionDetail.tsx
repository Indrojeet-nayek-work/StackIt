import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Eye,
  Tag,
  Check,
  LogIn,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">(
    "signup",
  );

  const mockQuestion = {
    id: 1,
    title: "How to implement authentication in React?",
    description:
      "I'm trying to build a React application with user authentication. What's the best approach for handling login/logout and protecting routes? I've looked into using JWT tokens but I'm not sure about the security implications and best practices.",
    author: "john_doe",
    authorAvatar: "JD",
    votes: 15,
    views: 234,
    tags: ["React", "Authentication", "JWT"],
    createdAt: "2 hours ago",
  };

  const mockAnswers = [
    {
      id: 1,
      content:
        "For React authentication, I recommend using a combination of JWT tokens and React Context. Here's a comprehensive approach that I've used successfully in production applications...",
      author: "sarah_dev",
      authorAvatar: "SD",
      votes: 23,
      isAccepted: true,
      createdAt: "1 hour ago",
    },
    {
      id: 2,
      content:
        "Another approach is to use a library like Auth0 or Firebase Auth which handles the complexity for you. This is especially useful if you want to support social logins...",
      author: "mike_architect",
      authorAvatar: "MA",
      votes: 8,
      isAccepted: false,
      createdAt: "30 minutes ago",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <h1 className="text-xl sm:text-2xl font-bold leading-tight break-words">
            {mockQuestion.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <span>Asked {mockQuestion.createdAt}</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{mockQuestion.views} views</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Voting section */}
            <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0 sm:space-y-2 order-2 sm:order-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowUp className="h-5 w-5" />
              </Button>
              <span className="text-lg font-medium min-w-0">
                {mockQuestion.votes}
              </span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>

            {/* Content section */}
            <div className="flex-1 min-w-0 order-1 sm:order-2">
              <p className="text-foreground mb-4 break-words">
                {mockQuestion.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockQuestion.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <Button variant="outline" size="sm" className="w-fit">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {mockQuestion.authorAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground truncate">
                    {mockQuestion.author}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          {mockAnswers.length} Answers
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {mockAnswers.map((answer) => (
          <Card
            key={answer.id}
            className={
              answer.isAccepted
                ? "border-green-200 bg-green-50/50 dark:bg-green-950/20"
                : ""
            }
          >
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Voting section */}
                <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0 sm:space-y-2 order-2 sm:order-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-medium min-w-0">
                    {answer.votes}
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ArrowDown className="h-5 w-5" />
                  </Button>
                  {answer.isAccepted && (
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                </div>

                {/* Content section */}
                <div className="flex-1 min-w-0 order-1 sm:order-2">
                  <p className="text-foreground mb-4 break-words leading-relaxed">
                    {answer.content}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Button variant="outline" size="sm" className="w-fit">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Comment
                    </Button>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-2">
                      <span className="text-sm text-muted-foreground">
                        answered {answer.createdAt}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {answer.authorAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground truncate">
                          {answer.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Answer Section */}
      {isAuthenticated ? (
        <Card className="mt-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">Your Answer</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="min-h-[200px] p-4 border rounded-lg bg-background">
                <p className="text-muted-foreground">
                  Write your answer here using the rich text editor...
                </p>
              </div>
              <Button className="bg-reddit-orange hover:bg-reddit-orange/90">
                Post Your Answer
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-6 border-reddit-orange/20 bg-gradient-to-r from-reddit-orange/5 to-reddit-blue/5">
          <CardContent className="pt-6 text-center">
            <div className="max-w-md mx-auto">
              <LogIn className="h-12 w-12 mx-auto text-reddit-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Join the Discussion
              </h3>
              <p className="text-muted-foreground mb-4">
                Sign up or log in to post your answer and help the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  className="bg-reddit-orange hover:bg-reddit-orange/90"
                  onClick={() => {
                    setAuthDialogTab("signup");
                    setAuthDialogOpen(true);
                  }}
                >
                  Sign Up to Answer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuthDialogTab("login");
                    setAuthDialogOpen(true);
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <AuthDialog
        isOpen={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        defaultTab={authDialogTab}
      />
    </div>
  );
}
