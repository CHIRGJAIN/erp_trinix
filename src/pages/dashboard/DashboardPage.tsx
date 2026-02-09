import { useStore } from '@/lib/store';
import { PageHeader } from '@/components/ui/page-header';
import { KPICard } from '@/components/ui/kpi-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge, getStatusVariant } from '@/components/ui/status-badge';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  Receipt,
  Package,
  FileText,
  AlertTriangle,
  CheckCircle,
  Server,
  Activity,
  Plus,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock chart data
const revenueData = [
  { month: 'Sep', revenue: 45000, expenses: 28000 },
  { month: 'Oct', revenue: 52000, expenses: 31000 },
  { month: 'Nov', revenue: 48000, expenses: 29000 },
  { month: 'Dec', revenue: 61000, expenses: 35000 },
  { month: 'Jan', revenue: 55000, expenses: 32000 },
  { month: 'Feb', revenue: 67000, expenses: 38000 },
];

const expenseCategories = [
  { name: 'Infrastructure', value: 35, color: 'hsl(38, 92%, 50%)' },
  { name: 'Software', value: 25, color: 'hsl(226, 70%, 45%)' },
  { name: 'Travel', value: 20, color: 'hsl(142, 76%, 36%)' },
  { name: 'Marketing', value: 12, color: 'hsl(280, 65%, 60%)' },
  { name: 'Other', value: 8, color: 'hsl(215, 20%, 65%)' },
];

export default function DashboardPage() {
  const { invoices, expenses, products, servers, incidents, notifications, tasks, currentUser } = useStore();

  // Calculate KPIs
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidInvoices = invoices.filter(i => i.status === 'paid');
  const pendingInvoices = invoices.filter(i => ['pending', 'sent'].includes(i.status));
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.total, 0);
  const lowStockProducts = products.filter(p => p.currentStock <= p.reorderLevel);
  const onlineServers = servers.filter(s => s.status === 'online');
  const avgUptime = servers.length > 0 
    ? (servers.reduce((sum, s) => sum + s.uptime, 0) / servers.length).toFixed(2)
    : 0;
  const openIncidents = incidents.filter(i => i.status !== 'resolved');
  const pendingTasks = tasks.filter(t => t.status !== 'done');

  const quickActions = [
    { label: 'Create Invoice', href: '/invoices/new', icon: FileText },
    { label: 'Add Expense', href: '/expenses/new', icon: Receipt },
    { label: 'Add Product', href: '/products/new', icon: Package },
    { label: 'Add Server', href: '/servers/new', icon: Server },
  ];

  const recentActivity = [
    { id: 1, type: 'invoice', message: 'Invoice INV-2025-001 paid by TechStart Inc.', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'expense', message: 'New expense submitted: Team Lunch', time: '4 hours ago', status: 'pending' },
    { id: 3, type: 'server', message: 'Server prod-api-01 health check passed', time: '5 hours ago', status: 'success' },
    { id: 4, type: 'incident', message: 'Incident resolved: API Gateway High Latency', time: '1 day ago', status: 'success' },
    { id: 5, type: 'maintenance', message: 'Maintenance scheduled for prod-api-01', time: '1 day ago', status: 'info' },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title={`Welcome back, ${currentUser?.name.split(' ')[0] || 'User'}`}
        description="Here's an overview of your business performance."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/finance/reports">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Reports
              </Link>
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={12.5}
          trend="up"
          changeLabel="vs last month"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <KPICard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          change={-3.2}
          trend="down"
          changeLabel="vs last month"
          icon={<Receipt className="h-5 w-5" />}
        />
        <KPICard
          title="Pending Invoices"
          value={pendingInvoices.length}
          changeLabel={`$${pendingInvoices.reduce((s, i) => s + i.total, 0).toLocaleString()} total`}
          icon={<FileText className="h-5 w-5" />}
        />
        <KPICard
          title="Low Stock Items"
          value={lowStockProducts.length}
          changeLabel={lowStockProducts.length > 0 ? 'Needs attention' : 'All stocked'}
          trend={lowStockProducts.length > 0 ? 'down' : 'neutral'}
          icon={<Package className="h-5 w-5" />}
        />
      </div>

      {/* Server & Infrastructure KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Servers Online"
          value={`${onlineServers.length}/${servers.length}`}
          changeLabel="All systems operational"
          trend={onlineServers.length === servers.length ? 'up' : 'down'}
          icon={<Server className="h-5 w-5" />}
        />
        <KPICard
          title="Avg Uptime"
          value={`${avgUptime}%`}
          change={0.5}
          trend="up"
          changeLabel="this month"
          icon={<Activity className="h-5 w-5" />}
        />
        <KPICard
          title="Open Incidents"
          value={openIncidents.length}
          changeLabel={openIncidents.length === 0 ? 'No active issues' : 'Requires attention'}
          trend={openIncidents.length === 0 ? 'up' : 'down'}
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <KPICard
          title="Tasks Due"
          value={pendingTasks.length}
          changeLabel="pending tasks"
          icon={<CheckCircle className="h-5 w-5" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue vs Expenses Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium">Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs fill-muted-foreground"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    className="text-xs fill-muted-foreground"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    dot={false}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Expense Categories</CardTitle>
            <CardDescription>This month's breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {expenseCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
            <CardDescription>Common tasks at your fingertips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to={action.href}>
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
              <CardDescription>Latest updates across your organization</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/settings/audit">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                >
                  <div className={`mt-0.5 h-2 w-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'pending' ? 'bg-amber-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Items */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Pending Invoices</CardTitle>
              <CardDescription>Awaiting payment</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/invoices">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {pendingInvoices.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No pending invoices
              </p>
            ) : (
              <div className="space-y-3">
                {pendingInvoices.slice(0, 5).map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium text-sm">{invoice.number}</p>
                      <p className="text-xs text-muted-foreground">{invoice.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">${invoice.total.toLocaleString()}</p>
                      <StatusBadge variant={getStatusVariant(invoice.status)}>
                        {invoice.status}
                      </StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Server Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Server Status</CardTitle>
              <CardDescription>Infrastructure overview</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/servers">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {servers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No servers configured
              </p>
            ) : (
              <div className="space-y-3">
                {servers.slice(0, 5).map((server) => (
                  <div
                    key={server.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2.5 w-2.5 rounded-full ${
                        server.status === 'online' ? 'bg-green-500' :
                        server.status === 'offline' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{server.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{server.environment}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{server.uptime}%</p>
                      <p className="text-xs text-muted-foreground">
                        CPU: {server.cpuUsage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
