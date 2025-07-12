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
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Image,
  Smile,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
  isActive?: boolean;
}

function EditorButton({ icon, tooltip, onClick, isActive }: EditorButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? "default" : "ghost"}
          size="sm"
          onClick={onClick}
          type="button"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">(
    "signup",
  );
  const [answerContent, setAnswerContent] = useState("");
  const [questionVotes, setQuestionVotes] = useState(15);
  const [questionUserVote, setQuestionUserVote] = useState<
    "up" | "down" | null
  >(null);
  const [answers, setAnswers] = useState([
    {
      id: 1,
      content:
        "For React authentication, I recommend using a combination of JWT tokens and React Context. Here's a comprehensive approach that I've used successfully in production applications...",
      author: "sarah_dev",
      authorAvatar: "SD",
      votes: 23,
      userVote: null as "up" | "down" | null,
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
      userVote: null as "up" | "down" | null,
      isAccepted: false,
      createdAt: "30 minutes ago",
    },
  ]);

  const mockQuestion = {
    id: 1,
    title: "How to implement authentication in React?",
    description:
      "I'm trying to build a React application with user authentication. What's the best approach for handling login/logout and protecting routes? I've looked into using JWT tokens but I'm not sure about the security implications and best practices.",
    author: "john_doe",
    authorAvatar: "JD",
    views: 234,
    tags: ["React", "Authentication", "JWT"],
    createdAt: "2 hours ago",
  };

  const handleQuestionVote = (type: "up" | "down") => {
    if (!isAuthenticated) return;

    if (questionUserVote === type) {
      setQuestionVotes((prev) => prev + (type === "up" ? -1 : 1));
      setQuestionUserVote(null);
    } else if (questionUserVote === null) {
      setQuestionVotes((prev) => prev + (type === "up" ? 1 : -1));
      setQuestionUserVote(type);
    } else {
      setQuestionVotes((prev) => prev + (type === "up" ? 2 : -2));
      setQuestionUserVote(type);
    }
  };

  const handleAnswerVote = (answerId: number, type: "up" | "down") => {
    if (!isAuthenticated) return;

    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) => {
        if (answer.id === answerId) {
          let newVotes = answer.votes;
          let newUserVote = answer.userVote;

          if (newUserVote === type) {
            newVotes += type === "up" ? -1 : 1;
            newUserVote = null;
          } else if (newUserVote === null) {
            newVotes += type === "up" ? 1 : -1;
            newUserVote = type;
          } else {
            newVotes += type === "up" ? 2 : -2;
            newUserVote = type;
          }

          return { ...answer, votes: newVotes, userVote: newUserVote };
        }
        return answer;
      }),
    );
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleSubmitAnswer = () => {
    if (!answerContent.trim()) return;

    const newAnswer = {
      id: answers.length + 1,
      content: answerContent,
      author: user?.username || "anonymous",
      authorAvatar: user?.avatar || "AN",
      votes: 0,
      userVote: null as "up" | "down" | null,
      isAccepted: false,
      createdAt: "just now",
    };

    setAnswers([...answers, newAnswer]);
    setAnswerContent("");

    // Clear the contentEditable div
    const editorDiv = document.querySelector(
      '[contenteditable="true"]',
    ) as HTMLDivElement;
    if (editorDiv) {
      editorDiv.innerHTML = "";
    }
  };

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

      {/* Question Card */}
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
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 hover:bg-upvote/10 hover:text-upvote ${
                  questionUserVote === "up" ? "bg-upvote/20 text-upvote" : ""
                }`}
                disabled={!isAuthenticated}
                onClick={() => handleQuestionVote("up")}
                title={!isAuthenticated ? "Login to vote" : "Upvote"}
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
              <span className="text-lg font-medium min-w-0">
                {questionVotes}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 hover:bg-downvote/10 hover:text-downvote ${
                  questionUserVote === "down"
                    ? "bg-downvote/20 text-downvote"
                    : ""
                }`}
                disabled={!isAuthenticated}
                onClick={() => handleQuestionVote("down")}
                title={!isAuthenticated ? "Login to vote" : "Downvote"}
              >
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

      {/* Answers Section */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          {answers.length} Answers
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {answers.map((answer) => (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 hover:bg-upvote/10 hover:text-upvote ${
                      answer.userVote === "up" ? "bg-upvote/20 text-upvote" : ""
                    }`}
                    disabled={!isAuthenticated}
                    onClick={() => handleAnswerVote(answer.id, "up")}
                    title={!isAuthenticated ? "Login to vote" : "Upvote"}
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-medium min-w-0">
                    {answer.votes}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 hover:bg-downvote/10 hover:text-downvote ${
                      answer.userVote === "down"
                        ? "bg-downvote/20 text-downvote"
                        : ""
                    }`}
                    disabled={!isAuthenticated}
                    onClick={() => handleAnswerVote(answer.id, "down")}
                    title={!isAuthenticated ? "Login to vote" : "Downvote"}
                  >
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
              {/* Editor toolbar */}
              <div className="border rounded-lg">
                <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50">
                  <EditorButton
                    icon={<Bold className="h-4 w-4" />}
                    tooltip="Bold"
                    onClick={() => formatText("bold")}
                  />
                  <EditorButton
                    icon={<Italic className="h-4 w-4" />}
                    tooltip="Italic"
                    onClick={() => formatText("italic")}
                  />
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  <EditorButton
                    icon={<List className="h-4 w-4" />}
                    tooltip="Bullet List"
                    onClick={() => formatText("insertUnorderedList")}
                  />
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  <EditorButton
                    icon={<LinkIcon className="h-4 w-4" />}
                    tooltip="Insert Link"
                    onClick={() => {
                      const url = prompt("Enter URL:");
                      if (url) formatText("createLink", url);
                    }}
                  />
                  <EditorButton
                    icon={<Image className="h-4 w-4" />}
                    tooltip="Insert Image"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const dataUrl = e.target?.result as string;
                            formatText("insertImage", dataUrl);
                          };
                          reader.readAsDataURL(file);
                        }
                      };
                      input.click();
                    }}
                  />
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        className="h-8 w-8 p-0"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 p-2">
                      <div className="grid grid-cols-8 gap-1">
                        {[
                          "😀",
                          "😃",
                          "😄",
                          "😁",
                          "😅",
                          "😂",
                          "🤣",
                          "😊",
                          "😇",
                          "🙂",
                          "🙃",
                          "😉",
                          "😌",
                          "😍",
                          "🥰",
                          "😘",
                          "😗",
                          "😙",
                          "😚",
                          "😋",
                          "😛",
                          "😝",
                          "😜",
                          "🤪",
                          "🤨",
                          "🧐",
                          "🤓",
                          "😎",
                          "🤩",
                          "🥳",
                          "😏",
                          "😒",
                        ].map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            className="p-1 hover:bg-accent rounded text-lg"
                            onClick={() => {
                              formatText("insertText", emoji);
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  contentEditable
                  className="min-h-[200px] p-4 focus:outline-none prose prose-sm max-w-none"
                  style={{ whiteSpace: "pre-wrap" }}
                  onInput={(e) =>
                    setAnswerContent(e.currentTarget.textContent || "")
                  }
                  data-placeholder="Write your answer here. Be clear and helpful!"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Your answer will help others in the community
                </p>
                <Button
                  className="bg-reddit-orange hover:bg-reddit-orange/90"
                  onClick={handleSubmitAnswer}
                  disabled={!answerContent.trim()}
                >
                  Post Your Answer
                </Button>
              </div>
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
