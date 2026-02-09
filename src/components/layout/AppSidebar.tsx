import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Truck,
  DollarSign,
  Receipt,
  UserCircle,
  Briefcase,
  Settings,
  ChevronDown,
  ChevronRight,
  Server,
  Activity,
  AlertTriangle,
  Calendar,
  Building,
  FileText,
  PieChart,
  CreditCard,
  ClipboardList,
  Boxes,
  UserCheck,
  Clock,
  Shield,
  BarChart3,
  Wrench,
  Gauge,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  roles?: string[];
  children?: Omit<NavItem, 'children'>[];
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Sales',
    icon: ShoppingCart,
    roles: ['owner', 'admin', 'sales'],
    children: [
      { title: 'Customers', href: '/customers', icon: Users },
      { title: 'Leads', href: '/leads', icon: UserCheck },
      { title: 'Invoices', href: '/invoices', icon: FileText },
      { title: 'Payments', href: '/payments', icon: CreditCard },
    ],
  },
  {
    title: 'Purchases',
    icon: Truck,
    roles: ['owner', 'admin', 'inventory'],
    children: [
      { title: 'Vendors', href: '/vendors', icon: Building },
      { title: 'Purchase Orders', href: '/purchase-orders', icon: ClipboardList },
    ],
  },
  {
    title: 'Inventory',
    icon: Package,
    roles: ['owner', 'admin', 'inventory'],
    children: [
      { title: 'Products', href: '/products', icon: Boxes },
      { title: 'Warehouses', href: '/warehouses', icon: Building },
      { title: 'Stock Movements', href: '/stock-movements', icon: Activity },
    ],
  },
  {
    title: 'Expenses',
    icon: Receipt,
    roles: ['owner', 'admin', 'finance'],
    children: [
      { title: 'Overview', href: '/expenses', icon: PieChart },
      { title: 'All Expenses', href: '/expenses/list', icon: Receipt },
      { title: 'Categories', href: '/expenses/categories', icon: Package },
      { title: 'Budgets', href: '/expenses/budgets', icon: Gauge },
      { title: 'Subscriptions', href: '/expenses/subscriptions', icon: Clock },
      { title: 'Reimbursements', href: '/expenses/reimbursements', icon: DollarSign },
    ],
  },
  {
    title: 'Finance',
    icon: DollarSign,
    roles: ['owner', 'admin', 'finance'],
    children: [
      { title: 'Accounts', href: '/finance/accounts', icon: Building },
      { title: 'Transactions', href: '/finance/transactions', icon: Activity },
      { title: 'Reports', href: '/finance/reports', icon: BarChart3 },
    ],
  },
  {
    title: 'HR & Payroll',
    icon: UserCircle,
    roles: ['owner', 'admin', 'hr'],
    children: [
      { title: 'Employees', href: '/employees', icon: Users },
      { title: 'Leave Requests', href: '/leave-requests', icon: Calendar },
      { title: 'Attendance', href: '/attendance', icon: Clock },
      { title: 'Payroll', href: '/payroll', icon: DollarSign },
    ],
  },
  {
    title: 'Projects',
    icon: Briefcase,
    children: [
      { title: 'All Projects', href: '/projects', icon: Briefcase },
      { title: 'Tasks', href: '/tasks', icon: ClipboardList },
    ],
  },
  {
    title: 'Servers',
    icon: Server,
    roles: ['owner', 'admin', 'devops'],
    children: [
      { title: 'Overview', href: '/servers', icon: Gauge },
      { title: 'All Servers', href: '/servers/list', icon: Server },
      { title: 'Services', href: '/servers/services', icon: Boxes },
      { title: 'Incidents', href: '/servers/incidents', icon: AlertTriangle },
      { title: 'Maintenance', href: '/servers/maintenance', icon: Wrench },
      { title: 'Costs', href: '/servers/costs', icon: DollarSign },
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    roles: ['owner', 'admin'],
    children: [
      { title: 'Organization', href: '/settings', icon: Building },
      { title: 'Users', href: '/settings/users', icon: Users },
      { title: 'Roles', href: '/settings/roles', icon: Shield },
      { title: 'Audit Log', href: '/settings/audit', icon: FileText },
    ],
  },
];

interface NavGroupProps {
  item: NavItem;
  collapsed?: boolean;
}

function NavGroup({ item, collapsed }: NavGroupProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(
    item.children?.some(child => location.pathname.startsWith(child.href || '')) || false
  );
  const Icon = item.icon;

  if (!item.children) {
    return (
      <NavLink
        to={item.href || '#'}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
          )
        }
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span className="truncate">{item.title}</span>}
        {!collapsed && item.badge && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {item.badge}
          </Badge>
        )}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          isOpen && 'bg-sidebar-accent/50'
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{item.title}</span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0" />
            )}
          </>
        )}
      </button>
      {isOpen && !collapsed && (
        <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3">
          {item.children.map((child) => {
            const ChildIcon = child.icon;
            return (
              <NavLink
                key={child.href}
                to={child.href || '#'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-muted transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  )
                }
              >
                <ChildIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{child.title}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface AppSidebarProps {
  collapsed?: boolean;
}

export function AppSidebar({ collapsed = false }: AppSidebarProps) {
  const { currentUser, organization } = useStore();

  const filteredNav = navigation.filter((item) => {
    if (!item.roles) return true;
    return currentUser && item.roles.includes(currentUser.role);
  });

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
            {organization?.name?.charAt(0) || 'A'}
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground truncate max-w-[160px]">
                {organization?.name || 'Acme Corp'}
              </span>
              <span className="text-xs text-sidebar-muted">Enterprise ERP</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {filteredNav.map((item) => (
            <NavGroup key={item.title} item={item} collapsed={collapsed} />
          ))}
        </nav>
      </ScrollArea>

      {/* User info */}
      {currentUser && (
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium">
              {currentUser.name.charAt(0)}
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {currentUser.name}
                </p>
                <p className="truncate text-xs text-sidebar-muted capitalize">
                  {currentUser.role}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
