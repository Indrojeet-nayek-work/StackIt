import { useState, useEffect, useMemo } from "react";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Eye,
  Tag,
  UserPlus,
  X,
  Flag,
  ArrowLeft,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "@/components/auth/AuthDialog";

interface Question {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  createdAt: string;
  hasAcceptedAnswer: boolean;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    title: "How to implement authentication in React?",
    description:
      "I'm trying to build a React application with user authentication. What's the best approach for handling login/logout and protecting routes?",
    author: "john_doe",
    authorAvatar: "JD",
    votes: 15,
    answers: 8,
    views: 234,
    tags: ["React", "Authentication", "JWT"],
    createdAt: "2 hours ago",
    hasAcceptedAnswer: true,
  },
  {
    id: 2,
    title: "TypeScript generics best practices",
    description:
      "What are some best practices when using TypeScript generics? I'm struggling with complex type definitions.",
    author: "sarah_dev",
    authorAvatar: "SD",
    votes: 23,
    answers: 5,
    views: 187,
    tags: ["TypeScript", "Generics", "Best Practices"],
    createdAt: "4 hours ago",
    hasAcceptedAnswer: false,
  },
  {
    id: 3,
    title: "Database design for e-commerce platform",
    description:
      "I'm designing a database schema for an e-commerce platform. How should I structure the relationships between users, products, and orders?",
    author: "mike_architect",
    authorAvatar: "MA",
    votes: 31,
    answers: 12,
    views: 456,
    tags: ["Database", "PostgreSQL", "E-commerce"],
    createdAt: "1 day ago",
    hasAcceptedAnswer: true,
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox - when to use which?",
    description:
      "I'm confused about when to use CSS Grid vs Flexbox. Can someone explain the main differences and use cases?",
    author: "css_learner",
    authorAvatar: "CL",
    votes: 8,
    answers: 3,
    views: 123,
    tags: ["CSS", "Grid", "Flexbox"],
    createdAt: "2 days ago",
    hasAcceptedAnswer: false,
  },
  {
    id: 5,
    title: "Next.js 14 App Router optimization techniques",
    description:
      "I'm working with Next.js 14 App Router and need to optimize my application. What are the best practices for performance?",
    author: "nextjs_pro",
    authorAvatar: "NP",
    votes: 42,
    answers: 15,
    views: 567,
    tags: ["Next.js", "Performance", "App Router"],
    createdAt: "3 hours ago",
    hasAcceptedAnswer: true,
  },
  {
    id: 6,
    title: "Node.js microservices architecture patterns",
    description:
      "Building a microservices architecture with Node.js. What patterns should I follow for service communication?",
    author: "backend_guru",
    authorAvatar: "BG",
    votes: 28,
    answers: 9,
    views: 345,
    tags: ["Node.js", "Microservices", "Architecture"],
    createdAt: "6 hours ago",
    hasAcceptedAnswer: false,
  },
  {
    id: 7,
    title: "Python data analysis with pandas performance issues",
    description:
      "My pandas operations are slow with large datasets. How can I optimize DataFrame operations for better performance?",
    author: "data_scientist",
    authorAvatar: "DS",
    votes: 19,
    answers: 7,
    views: 289,
    tags: ["Python", "Pandas", "Performance"],
    createdAt: "8 hours ago",
    hasAcceptedAnswer: true,
  },
  {
    id: 8,
    title: "Docker containerization best practices",
    description:
      "Setting up Docker for a multi-stage application. What are the security and performance best practices?",
    author: "devops_engineer",
    authorAvatar: "DE",
    votes: 35,
    answers: 11,
    views: 412,
    tags: ["Docker", "DevOps", "Containerization"],
    createdAt: "12 hours ago",
    hasAcceptedAnswer: false,
  },
  {
    id: 9,
    title: "AWS Lambda cold start optimization",
    description:
      "Experiencing high cold start times with AWS Lambda functions. What techniques can reduce startup latency?",
    author: "cloud_architect",
    authorAvatar: "CA",
    votes: 24,
    answers: 6,
    views: 298,
    tags: ["AWS", "Lambda", "Performance"],
    createdAt: "1 day ago",
    hasAcceptedAnswer: true,
  },
  {
    id: 10,
    title: "Machine Learning model deployment strategies",
    description:
      "What are the best practices for deploying ML models to production? Looking for scalable solutions.",
    author: "ml_engineer",
    authorAvatar: "ML",
    votes: 31,
    answers: 8,
    views: 367,
    tags: ["Machine Learning", "Deployment", "MLOps"],
    createdAt: "1 day ago",
    hasAcceptedAnswer: false,
  },
];

function QuestionCard({ question }: { question: Question }) {
  const { isAuthenticated } = useAuth();
  const [votes, setVotes] = useState(question.votes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (!isAuthenticated) return;

    if (userVote === type) {
      // Remove vote
      setVotes((prev) => prev + (type === "up" ? -1 : 1));
      setUserVote(null);
    } else if (userVote === null) {
      // Add vote
      setVotes((prev) => prev + (type === "up" ? 1 : -1));
      setUserVote(type);
    } else {
      // Change vote
      setVotes((prev) => prev + (type === "up" ? 2 : -2));
      setUserVote(type);
    }
  };

  const handleReport = () => {
    console.log("Reporting question:", question.id);
    alert(
      "Question reported successfully. Thank you for keeping our community safe!",
    );
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-reddit-orange/20 hover:border-l-reddit-orange">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Voting sidebar */}
          <div className="flex sm:flex-col items-center justify-center sm:justify-start p-2 sm:p-4 bg-muted/30 border-b sm:border-b-0 sm:border-r order-2 sm:order-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 hover:bg-upvote/10 hover:text-upvote ${
                userVote === "up" ? "bg-upvote/20 text-upvote" : ""
              }`}
              disabled={!isAuthenticated}
              onClick={() => handleVote("up")}
              title={!isAuthenticated ? "Login to vote" : "Upvote"}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium py-1 mx-2 sm:mx-0">
              {votes}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 hover:bg-downvote/10 hover:text-downvote ${
                userVote === "down" ? "bg-downvote/20 text-downvote" : ""
              }`}
              disabled={!isAuthenticated}
              onClick={() => handleVote("down")}
              title={!isAuthenticated ? "Login to vote" : "Downvote"}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 sm:p-4 order-1 sm:order-2 min-w-0">
            <div className="mb-2">
              <Link
                to={`/question/${question.id}`}
                className="text-base sm:text-lg font-semibold hover:text-reddit-orange transition-colors block break-words"
              >
                {question.title}
              </Link>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2 break-words">
                {question.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
              {question.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-reddit-blue/10 text-reddit-blue hover:bg-reddit-blue/20 border-reddit-blue/20"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  <span className="truncate max-w-20 sm:max-w-none">{tag}</span>
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {question.answers} answers
                  </span>
                  {question.hasAcceptedAnswer && (
                    <span className="text-success ml-1 flex-shrink-0">✓</span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {question.views} views
                  </span>
                </div>
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReport}
                    className="h-6 px-2 text-xs hover:bg-red-50 hover:text-red-600 flex-shrink-0"
                  >
                    <Flag className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">Report</span>
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2 min-w-0">
                <span className="text-xs sm:text-sm break-words">
                  by{" "}
                  <span className="text-reddit-orange font-medium truncate max-w-24 sm:max-w-none inline-block">
                    {question.author}
                  </span>{" "}
                  • {question.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Questions() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">(
    "login",
  );
  const [searchParams, setSearchParams] = useSearchParams();

  // Get filter parameters from URL
  const topicFilter = searchParams.get("topic");
  const techFilter = searchParams.get("tech");

  // Filter questions based on URL parameters
  const filteredQuestions = useMemo(() => {
    let filtered = mockQuestions;

    if (topicFilter) {
      filtered = filtered.filter((question) =>
        question.tags.some((tag) =>
          tag.toLowerCase().includes(topicFilter.toLowerCase()),
        ),
      );
    }

    if (techFilter) {
      filtered = filtered.filter((question) =>
        question.tags.some(
          (tag) => tag.toLowerCase() === techFilter.toLowerCase(),
        ),
      );
    }

    return filtered;
  }, [topicFilter, techFilter]);

  // Clear filters
  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Back Button */}
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      {!isAuthenticated && (
        <Alert className="mb-6 border-reddit-orange/20 bg-gradient-to-r from-reddit-orange/5 to-reddit-blue/5">
          <UserPlus className="h-4 w-4" />
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>
              <strong>Welcome to StackIt!</strong> Join our community to ask
              questions, share knowledge, and get help from developers.
            </span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAuthDialogTab("login");
                  setAuthDialogOpen(true);
                }}
              >
                Login
              </Button>
              <Button
                size="sm"
                className="bg-reddit-orange hover:bg-reddit-orange/90"
                onClick={() => {
                  setAuthDialogTab("signup");
                  setAuthDialogOpen(true);
                }}
              >
                Sign Up
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 p-4 sm:p-6 bg-gradient-to-r from-reddit-orange/5 to-reddit-blue/5 rounded-lg border border-reddit-orange/20">
        <div className="flex-1 mb-4 sm:mb-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-reddit-orange to-reddit-blue bg-clip-text text-transparent">
              Questions
            </h1>
            {(topicFilter || techFilter) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground w-fit"
              >
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>

          {/* Active Filters */}
          {(topicFilter || techFilter) && (
            <div className="flex flex-wrap gap-2 mb-2">
              {topicFilter && (
                <Badge
                  variant="secondary"
                  className="bg-reddit-orange/10 text-reddit-orange"
                >
                  Topic: {topicFilter}
                </Badge>
              )}
              {techFilter && (
                <Badge
                  variant="secondary"
                  className="bg-reddit-blue/10 text-reddit-blue"
                >
                  Technology: {techFilter}
                </Badge>
              )}
            </div>
          )}

          <p className="text-muted-foreground text-sm sm:text-base">
            {topicFilter || techFilter
              ? `Showing ${filteredQuestions.length} questions matching your filters`
              : "Find answers to your questions and help others in the community"}
          </p>
        </div>

        <div className="flex-shrink-0">
          {isAuthenticated && (
            <Link to="/ask">
              <Button className="bg-reddit-orange hover:bg-reddit-orange/90 font-semibold">
                Ask a Question
              </Button>
            </Link>
          )}
          {isAuthenticated ? (
            <Link to="/ask">
              <Button className="bg-reddit-orange hover:bg-reddit-orange/90 text-white font-semibold px-4 sm:px-6 py-2 shadow-md">
                Ask Question
              </Button>
            </Link>
          ) : (
            <Button
              className="bg-reddit-orange hover:bg-reddit-orange/90 text-white font-semibold px-4 sm:px-6 py-2 shadow-md"
              onClick={() => {
                setAuthDialogTab("signup");
                setAuthDialogOpen(true);
              }}
            >
              Join to Ask
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="newest" className="mb-6">
        <TabsList className="bg-muted/50 p-1 w-full grid grid-cols-4 h-auto">
          <TabsTrigger
            value="newest"
            className="data-[state=active]:bg-reddit-orange data-[state=active]:text-white text-xs px-1 py-2 h-auto whitespace-nowrap overflow-hidden"
          >
            <span className="hidden sm:inline">Newest</span>
            <span className="sm:hidden">New</span>
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className="data-[state=active]:bg-reddit-orange data-[state=active]:text-white text-xs px-1 py-2 h-auto whitespace-nowrap overflow-hidden"
          >
            <span className="hidden sm:inline">🔥 Trending</span>
            <span className="sm:hidden">🔥</span>
          </TabsTrigger>
          <TabsTrigger
            value="unanswered"
            className="data-[state=active]:bg-warning data-[state=active]:text-white text-xs px-1 py-2 h-auto whitespace-nowrap overflow-hidden"
          >
            <span className="hidden sm:inline">❓ Unanswered</span>
            <span className="sm:hidden">❓</span>
          </TabsTrigger>
          <TabsTrigger
            value="answered"
            className="data-[state=active]:bg-success data-[state=active]:text-white text-xs px-1 py-2 h-auto whitespace-nowrap overflow-hidden"
          >
            <span className="hidden sm:inline">✅ Answered</span>
            <span className="sm:hidden">✅</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="newest" className="space-y-4 mt-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No questions found matching your filters.</p>
              <Button variant="ghost" onClick={clearFilters} className="mt-2">
                Clear filters to see all questions
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4 mt-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions
              .sort((a, b) => b.votes - a.votes)
              .map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No trending questions found matching your filters.</p>
              <Button variant="ghost" onClick={clearFilters} className="mt-2">
                Clear filters to see all questions
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4 mt-6">
          {filteredQuestions.filter((q) => !q.hasAcceptedAnswer).length > 0 ? (
            filteredQuestions
              .filter((q) => !q.hasAcceptedAnswer)
              .map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No unanswered questions found matching your filters.</p>
              <Button variant="ghost" onClick={clearFilters} className="mt-2">
                Clear filters to see all questions
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="answered" className="space-y-4 mt-6">
          {filteredQuestions.filter((q) => q.hasAcceptedAnswer).length > 0 ? (
            filteredQuestions
              .filter((q) => q.hasAcceptedAnswer)
              .map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No answered questions found matching your filters.</p>
              <Button variant="ghost" onClick={clearFilters} className="mt-2">
                Clear filters to see all questions
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AuthDialog
        isOpen={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        defaultTab={authDialogTab}
      />
    </div>
  );
}
