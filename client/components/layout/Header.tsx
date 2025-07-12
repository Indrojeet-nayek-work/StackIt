import { useState } from "react";
import { Bell, Menu, Plus, Search, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">(
    "login",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notificationCount = 3;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Mobile Header */}
        <div className="flex h-16 items-center justify-between lg:hidden">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-reddit-orange to-red-600 text-white font-bold shadow-md">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-reddit-orange to-red-600 bg-clip-text text-transparent">
              StackIt
            </span>
          </Link>

          {/* Mobile Right Actions */}
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

                  {isAuthenticated && user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="flex items-center py-2 text-lg font-medium text-reddit-orange"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/ask"
                        className="flex items-center py-2 text-lg font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Ask Question
                      </Link>

                      <div className="border-t pt-4">
                        <div className="flex items-center space-x-2 py-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-sm bg-reddit-orange text-white">
                              {user?.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user?.username}</span>
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                          <Button variant="ghost" className="justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                          <Button variant="ghost" className="justify-start">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                            {notificationCount > 0 && (
                              <Badge
                                variant="destructive"
                                className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                              >
                                {notificationCount}
                              </Badge>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={logout}
                          >
                            Log out
                          </Button>
                        </div>
                      </div>
                    </>
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
                        Sign Up
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
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-4 lg:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="w-full rounded-lg bg-muted/50 pl-10 h-10"
            />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex h-16 items-center">
          {/* Desktop Logo */}
          <div className="mr-8">
            <Link to="/" className="flex items-center space-x-2">
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
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="mr-8">
            <nav className="flex items-center space-x-6">
              <Link
                to="/questions"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Questions
              </Link>
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-sm font-medium text-reddit-orange hover:text-reddit-orange/80 transition-colors"
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>

          {/* Desktop Search */}
          <div className="flex-1 max-w-lg mr-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Search questions..."
                className="w-full rounded-lg bg-muted/50 pl-10"
              />
            </div>
          </div>

          {/* Desktop Navigation Actions */}
          <nav className="flex items-center space-x-4 ml-auto">
            {isAuthenticated ? (
              <>
                <Link to="/ask">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-reddit-orange hover:bg-reddit-orange/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Ask Question
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="h-4 w-4" />
                      {notificationCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                        >
                          {notificationCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between p-2">
                      <h4 className="text-sm font-semibold">Notifications</h4>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Mark all read
                      </Button>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex flex-col items-start p-3">
                      <div className="text-sm font-medium">
                        New answer on your question
                      </div>
                      <div className="text-xs text-muted-foreground">
                        "How to implement authentication in React?"
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2 minutes ago
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start p-3">
                      <div className="text-sm font-medium">
                        Someone mentioned you
                      </div>
                      <div className="text-xs text-muted-foreground">
                        "@username check this solution"
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1 hour ago
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start p-3">
                      <div className="text-sm font-medium">
                        Comment on your answer
                      </div>
                      <div className="text-xs text-muted-foreground">
                        "Great explanation, thanks!"
                      </div>
                      <div className="text-xs text-muted-foreground">
                        3 hours ago
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-reddit-orange text-white">
                          {user?.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {user?.username}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAuthDialogTab("login");
                    setAuthDialogOpen(true);
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button
                  size="sm"
                  className="bg-reddit-orange hover:bg-reddit-orange/90 font-semibold"
                  onClick={() => {
                    setAuthDialogTab("signup");
                    setAuthDialogOpen(true);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}

            <div className="ml-2">
              <ModeToggle />
            </div>
          </nav>
        </div>
      </div>

      <AuthDialog
        isOpen={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        defaultTab={authDialogTab}
      />
    </header>
  );
}
