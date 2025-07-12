import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Code,
  Users,
  MessageCircle,
  ArrowRight,
  Star,
  GitBranch,
  Zap,
  Heart,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const trendingTopics = [
  {
    id: 1,
    title: "Next.js 14 App Router",
    questions: 1247,
    trend: "+23%",
    category: "Frontend",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    questions: 892,
    trend: "+18%",
    category: "Programming",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    title: "React Server Components",
    questions: 634,
    trend: "+31%",
    category: "Frontend",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    title: "Database Design Patterns",
    questions: 567,
    trend: "+12%",
    category: "Backend",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    title: "AI/ML Integration",
    questions: 423,
    trend: "+45%",
    category: "AI/ML",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 6,
    title: "Cloud Architecture",
    questions: 389,
    trend: "+27%",
    category: "DevOps",
    color: "from-purple-500 to-violet-500",
  },
];

const trendingTechnologies = [
  { name: "React", questions: 12453, trend: "+15%", logo: "⚛️" },
  { name: "Next.js", questions: 8934, trend: "+28%", logo: "▲" },
  { name: "TypeScript", questions: 7821, trend: "+22%", logo: "📘" },
  { name: "Node.js", questions: 6754, trend: "+11%", logo: "🟢" },
  { name: "Python", questions: 5892, trend: "+19%", logo: "🐍" },
  { name: "PostgreSQL", questions: 4321, trend: "+16%", logo: "🐘" },
  { name: "Docker", questions: 3987, trend: "+24%", logo: "🐳" },
  { name: "AWS", questions: 3654, trend: "+20%", logo: "☁️" },
];

const featuredQuestions = [
  {
    id: 1,
    title: "How to optimize React performance with millions of components?",
    author: "react_expert",
    votes: 234,
    answers: 15,
    tags: ["React", "Performance", "Optimization"],
  },
  {
    id: 2,
    title: "Best practices for TypeScript in large-scale applications",
    author: "typescript_guru",
    votes: 189,
    answers: 12,
    tags: ["TypeScript", "Architecture", "Best Practices"],
  },
  {
    id: 3,
    title: "Database design for real-time chat applications",
    author: "db_architect",
    votes: 156,
    answers: 8,
    tags: ["Database", "Real-time", "WebSocket"],
  },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">(
    "signup",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Responsive Header for Landing Page */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          {/* Mobile Header */}
          <div className="flex h-16 items-center justify-between lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-reddit-orange to-red-600 text-white font-bold shadow-md">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-reddit-orange to-red-600 bg-clip-text text-transparent">
                StackIt
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <ModeToggle />

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-4 mt-6">
                    <Link
                      to="/questions"
                      className="flex items-center py-2 text-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Questions
                    </Link>

                    {isAuthenticated ? (
                      <Link
                        to="/questions"
                        className="flex items-center py-2 text-lg font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Go to Questions
                      </Link>
                    ) : (
                      <div className="flex flex-col space-y-3 pt-4 border-t">
                        <Button
                          className="w-full bg-reddit-orange hover:bg-reddit-orange/90"
                          onClick={() => {
                            setAuthDialogTab("signup");
                            setAuthDialogOpen(true);
                            setMobileMenuOpen(false);
                          }}
                        >
                          Join Free
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setAuthDialogTab("login");
                            setAuthDialogOpen(true);
                            setMobileMenuOpen(false);
                          }}
                        >
                          Sign In
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-reddit-orange to-red-600 text-white font-bold shadow-md">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-reddit-orange to-red-600 bg-clip-text text-transparent">
                StackIt
              </span>
            </div>

            <nav className="flex items-center space-x-4">
              <Link
                to="/questions"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Questions
              </Link>
              <ModeToggle />
              {isAuthenticated ? (
                <Link to="/questions">
                  <Button variant="outline">Go to Questions</Button>
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthDialogTab("login");
                      setAuthDialogOpen(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-reddit-orange hover:bg-reddit-orange/90 font-semibold"
                    onClick={() => {
                      setAuthDialogTab("signup");
                      setAuthDialogOpen(true);
                    }}
                  >
                    Join Free
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-reddit-orange/10 via-background to-reddit-blue/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4 py-12 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center mb-6 lg:mb-8">
              <div className="flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-reddit-orange to-red-600 text-white shadow-2xl mb-4 lg:mr-4 lg:mb-0">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 lg:h-10 lg:w-10"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <h1 className="text-4xl lg:text-7xl font-bold bg-gradient-to-r from-reddit-orange via-red-600 to-reddit-blue bg-clip-text text-transparent">
                StackIt
              </h1>
            </div>

            <p className="text-lg lg:text-2xl text-muted-foreground mb-3 lg:mb-4">
              The developer community where knowledge flows freely
            </p>
            <p className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 max-w-2xl mx-auto px-4">
              Join millions of developers sharing knowledge, solving problems,
              and building the future together.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center mb-8 lg:mb-12 px-4">
              {isAuthenticated ? (
                <Link to="/questions">
                  <Button
                    size="lg"
                    className="bg-reddit-orange hover:bg-reddit-orange/90 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                  >
                    Explore Questions
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="bg-reddit-orange hover:bg-reddit-orange/90 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold shadow-lg w-full sm:w-auto"
                    onClick={() => {
                      setAuthDialogTab("signup");
                      setAuthDialogOpen(true);
                    }}
                  >
                    Join StackIt
                    <ArrowRight className="ml-2 h-4 lg:h-5 w-4 lg:w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg border-2 hover:bg-muted w-full sm:w-auto"
                    onClick={() => {
                      setAuthDialogTab("login");
                      setAuthDialogOpen(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Link to="/questions" className="w-full sm:w-auto">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg w-full"
                    >
                      Browse as Guest
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-3xl mx-auto px-4">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-reddit-orange">
                  2.5M+
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  Questions
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-reddit-blue">
                  890K+
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  Developers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-green-600">
                  15M+
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  Answers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-purple-600">
                  99%
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  Solved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4 flex flex-col sm:flex-row items-center justify-center">
              <TrendingUp className="mb-2 sm:mb-0 sm:mr-3 h-6 w-6 lg:h-8 lg:w-8 text-reddit-orange" />
              Trending Topics
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground px-4">
              Discover what the developer community is talking about right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTopics.map((topic) => (
              <Link
                key={topic.id}
                to={`/questions?topic=${encodeURIComponent(topic.title)}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-l-4 border-l-transparent hover:border-l-reddit-orange h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {topic.category}
                      </Badge>
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {topic.trend}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-reddit-orange transition-colors">
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {topic.questions.toLocaleString()} questions
                      </div>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Technologies */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4 flex flex-col sm:flex-row items-center justify-center">
              <Code className="mb-2 sm:mb-0 sm:mr-3 h-6 w-6 lg:h-8 lg:w-8 text-reddit-blue" />
              Trending Technologies
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground px-4">
              The most discussed technologies and frameworks in our community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            {trendingTechnologies.map((tech, index) => (
              <Link
                key={tech.name}
                to={`/questions?tech=${encodeURIComponent(tech.name)}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{tech.logo}</div>
                    <h3 className="font-semibold mb-2 group-hover:text-reddit-orange transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {tech.questions.toLocaleString()} questions
                    </p>
                    <div className="flex items-center justify-center text-green-600 text-sm font-medium">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {tech.trend}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Questions */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4 flex flex-col sm:flex-row items-center justify-center">
              <Star className="mb-2 sm:mb-0 sm:mr-3 h-6 w-6 lg:h-8 lg:w-8 text-yellow-500" />
              Featured Questions
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground px-4">
              High-quality questions that sparked great discussions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 lg:space-y-6">
            {featuredQuestions.map((question) => (
              <Card
                key={question.id}
                className="hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-4 lg:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:space-x-4 space-y-3 sm:space-y-0">
                    <div className="flex sm:flex-col items-center sm:items-center space-x-4 sm:space-x-0 sm:space-y-2 sm:min-w-0">
                      <div className="flex flex-col items-center">
                        <div className="text-base lg:text-lg font-bold text-reddit-orange">
                          {question.votes}
                        </div>
                        <div className="text-xs text-muted-foreground text-center">
                          votes
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-base lg:text-lg font-bold text-reddit-blue">
                          {question.answers}
                        </div>
                        <div className="text-xs text-muted-foreground text-center">
                          answers
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base lg:text-lg font-semibold mb-3 group-hover:text-reddit-orange transition-colors">
                        {question.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Asked by{" "}
                        <span className="text-reddit-orange font-medium">
                          {question.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/questions">
              <Button variant="outline" size="lg" className="px-8 py-4">
                View All Questions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-reddit-orange to-reddit-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-base lg:text-xl text-white/90 mb-6 lg:mb-8 max-w-2xl mx-auto px-4">
            Start asking questions, sharing knowledge, and connecting with
            developers from around the world.
          </p>
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center px-4">
              <Button
                size="lg"
                className="bg-white text-reddit-orange hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold w-full sm:w-auto shadow-lg"
                onClick={() => {
                  setAuthDialogTab("signup");
                  setAuthDialogOpen(true);
                }}
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-reddit-orange transition-all duration-200 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg w-full sm:w-auto backdrop-blur-sm bg-white/10"
                onClick={() => {
                  setAuthDialogTab("login");
                  setAuthDialogOpen(true);
                }}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </section>

      <AuthDialog
        isOpen={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        defaultTab={authDialogTab}
      />
    </div>
  );
}
