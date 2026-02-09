import { useStore } from '@/lib/store';
import { PageHeader } from '@/components/ui/page-header';
import { KPICard } from '@/components/ui/kpi-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Receipt, Plus, TrendingUp, TrendingDown, CreditCard, Clock, PieChart } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function ExpensesOverviewPage() {
  const { expenses, expenseCategories, subscriptions, budgets } = useStore();

  const thisMonth = expenses.filter(e => new Date(e.date).getMonth() === new Date().getMonth());
  const thisMonthTotal = thisMonth.reduce((sum, e) => sum + e.total, 0);
  const lastMonthTotal = 8500; // Mock data
  const monthChange = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(1);
  const subsTotal = subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0);
  const pendingReimb = expenses.filter(e => e.reimbursable && e.status === 'submitted').length;

  const categoryData = expenseCategories.map(cat => ({
    name: cat.name,
    value: expenses.filter(e => e.categoryId === cat.id).reduce((sum, e) => sum + e.total, 0),
    color: cat.color,
  })).filter(c => c.value > 0);

  return (
    <div className="page-container">
      <PageHeader
        title="Expense Overview"
        description="Track and manage company expenses, budgets, and reimbursements."
        breadcrumbs={[{ label: 'Expenses' }]}
        actions={
          <Button asChild>
            <Link to="/expenses/new"><Plus className="mr-2 h-4 w-4" />Add Expense</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard title="This Month" value={`$${thisMonthTotal.toLocaleString()}`} change={Number(monthChange)} trend={Number(monthChange) > 0 ? 'up' : 'down'} icon={<Receipt className="h-5 w-5" />} />
        <KPICard title="Last Month" value={`$${lastMonthTotal.toLocaleString()}`} icon={<TrendingDown className="h-5 w-5" />} />
        <KPICard title="Active Subscriptions" value={`$${subsTotal}/mo`} changeLabel={`${subscriptions.filter(s => s.status === 'active').length} services`} icon={<Clock className="h-5 w-5" />} />
        <KPICard title="Pending Reimbursements" value={pendingReimb} changeLabel="awaiting approval" icon={<CreditCard className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Spending by Category</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2} dataKey="value">
                    {categoryData.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.slice(0, 5).map(cat => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.name}</span>
                  </div>
                  <span className="font-medium">${cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Quick Links</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild><Link to="/expenses/list"><Receipt className="mr-2 h-4 w-4" />View All Expenses</Link></Button>
            <Button variant="outline" className="w-full justify-start" asChild><Link to="/expenses/categories"><PieChart className="mr-2 h-4 w-4" />Manage Categories</Link></Button>
            <Button variant="outline" className="w-full justify-start" asChild><Link to="/expenses/budgets"><TrendingUp className="mr-2 h-4 w-4" />Budget Settings</Link></Button>
            <Button variant="outline" className="w-full justify-start" asChild><Link to="/expenses/subscriptions"><Clock className="mr-2 h-4 w-4" />Subscriptions</Link></Button>
            <Button variant="outline" className="w-full justify-start" asChild><Link to="/expenses/reimbursements"><CreditCard className="mr-2 h-4 w-4" />Reimbursements</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
