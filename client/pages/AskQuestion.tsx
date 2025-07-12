import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

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

export default function AskQuestion() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, tags });
    navigate("/");
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <p>Redirecting to homepage...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Ask a Question</h1>
        <p className="text-muted-foreground mt-1">
          Get help from the community by asking a clear, detailed question
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Question Title</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., How to implement authentication in React?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
              required
            />
            <p className="text-sm text-muted-foreground mt-2">
              Be specific and imagine you're asking a question to another person
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <div className="mt-2 border rounded-lg">
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
                <EditorButton
                  icon={<Strikethrough className="h-4 w-4" />}
                  tooltip="Strikethrough"
                  onClick={() => formatText("strikeThrough")}
                />
                <Separator orientation="vertical" className="h-6 mx-1" />
                <EditorButton
                  icon={<List className="h-4 w-4" />}
                  tooltip="Bullet List"
                  onClick={() => formatText("insertUnorderedList")}
                />
                <EditorButton
                  icon={<ListOrdered className="h-4 w-4" />}
                  tooltip="Numbered List"
                  onClick={() => formatText("insertOrderedList")}
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
                <EditorButton
                  icon={<AlignLeft className="h-4 w-4" />}
                  tooltip="Align Left"
                  onClick={() => formatText("justifyLeft")}
                />
                <EditorButton
                  icon={<AlignCenter className="h-4 w-4" />}
                  tooltip="Align Center"
                  onClick={() => formatText("justifyCenter")}
                />
                <EditorButton
                  icon={<AlignRight className="h-4 w-4" />}
                  tooltip="Align Right"
                  onClick={() => formatText("justifyRight")}
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
                className="min-h-[200px] p-4 focus:outline-none"
                style={{ whiteSpace: "pre-wrap" }}
                onInput={(e) =>
                  setDescription(e.currentTarget.textContent || "")
                }
                data-placeholder="Describe your problem in detail. Include what you've tried and what you expect to happen."
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Include all the information someone would need to answer your
              question
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="tags" className="text-sm font-medium">
              Tags
            </Label>
            <div className="mt-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
              <Input
                id="tags"
                placeholder="Add tags (press Enter or comma to add)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Add up to 5 tags to describe what your question is about
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={!title.trim() || !description.trim()}>
            Submit Question
          </Button>
        </div>
      </form>
    </div>
  );
}
