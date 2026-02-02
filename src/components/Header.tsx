import { Link, useNavigate } from 'react-router-dom';
import { Film, Ticket, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <Film className="h-6 w-6" />
            <span className="hidden sm:inline">CinemaBook</span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link to="/movies">
              <Button variant="ghost" size="sm" className="gap-2">
                <Film className="h-4 w-4" />
                <span className="hidden sm:inline">Movies</span>
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/bookings">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Ticket className="h-4 w-4" />
                    <span className="hidden sm:inline">Bookings</span>
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
                  <span className="text-sm text-muted-foreground hidden md:inline">
                    {user?.username}
                  </span>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
