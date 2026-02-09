import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import {
  Bell,
  Search,
  Menu,
  LogOut,
  User,
  Settings,
  Moon,
  Sun,
  ChevronDown,
  Command,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CommandDialog } from '@/components/CommandPalette';

interface AppHeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export function AppHeader({ onToggleSidebar, sidebarCollapsed }: AppHeaderProps) {
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead, logout } = useStore();
  const navigate = useNavigate();
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success/20 text-success';
      case 'warning':
        return 'bg-warning/20 text-warning';
      case 'error':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-info/20 text-info';
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 transition-all duration-300',
          sidebarCollapsed ? 'left-16' : 'left-64'
        )}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className={cn(
                'w-64 pl-9 pr-12 transition-all duration-200',
                searchFocused && 'w-80'
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="h-3 w-3" />K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Plus className="mr-2 h-4 w-4" />
                Create
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/invoices/new')}>
                New Invoice
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/expenses/new')}>
                New Expense
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/customers/new')}>
                New Customer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/servers/new')}>
                New Server
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/tasks/new')}>
                New Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Command Palette Trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCommandOpen(true)}
            className="hidden md:flex"
          >
            <Command className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <h4 className="text-sm font-semibold">Notifications</h4>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={markAllNotificationsRead}
                  >
                    Mark all read
                  </Button>
                )}
              </div>
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Bell className="h-8 w-8 text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'flex gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors',
                          !notification.read && 'bg-muted/30'
                        )}
                        onClick={() => {
                          markNotificationRead(notification.id);
                          if (notification.actionUrl) {
                            navigate(notification.actionUrl);
                          }
                        }}
                      >
                        <div
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                            getNotificationIcon(notification.type)
                          )}
                        >
                          <Bell className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground/70">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {currentUser?.name.charAt(0) || 'U'}
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {currentUser?.name}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentUser?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
