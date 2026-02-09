import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

// Auth
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";

// Dashboard
import DashboardPage from "./pages/dashboard/DashboardPage";

// Sales
import CustomersPage from "./pages/sales/CustomersPage";
import InvoicesPage from "./pages/sales/InvoicesPage";

// Inventory
import ProductsPage from "./pages/inventory/ProductsPage";

// Expenses
import ExpensesOverviewPage from "./pages/expenses/ExpensesOverviewPage";

// Servers
import ServersOverviewPage from "./pages/servers/ServersOverviewPage";

// Fallback
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Sales */}
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/leads" element={<DashboardPage />} />
            <Route path="/payments" element={<DashboardPage />} />
            
            {/* Purchases */}
            <Route path="/vendors" element={<DashboardPage />} />
            <Route path="/purchase-orders" element={<DashboardPage />} />
            
            {/* Inventory */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/warehouses" element={<DashboardPage />} />
            <Route path="/stock-movements" element={<DashboardPage />} />
            
            {/* Expenses */}
            <Route path="/expenses" element={<ExpensesOverviewPage />} />
            <Route path="/expenses/list" element={<ExpensesOverviewPage />} />
            <Route path="/expenses/categories" element={<ExpensesOverviewPage />} />
            <Route path="/expenses/budgets" element={<ExpensesOverviewPage />} />
            <Route path="/expenses/subscriptions" element={<ExpensesOverviewPage />} />
            <Route path="/expenses/reimbursements" element={<ExpensesOverviewPage />} />
            
            {/* Finance */}
            <Route path="/finance/accounts" element={<DashboardPage />} />
            <Route path="/finance/transactions" element={<DashboardPage />} />
            <Route path="/finance/reports" element={<DashboardPage />} />
            
            {/* HR */}
            <Route path="/employees" element={<DashboardPage />} />
            <Route path="/leave-requests" element={<DashboardPage />} />
            <Route path="/attendance" element={<DashboardPage />} />
            <Route path="/payroll" element={<DashboardPage />} />
            
            {/* Projects */}
            <Route path="/projects" element={<DashboardPage />} />
            <Route path="/tasks" element={<DashboardPage />} />
            
            {/* Servers */}
            <Route path="/servers" element={<ServersOverviewPage />} />
            <Route path="/servers/list" element={<ServersOverviewPage />} />
            <Route path="/servers/services" element={<ServersOverviewPage />} />
            <Route path="/servers/incidents" element={<ServersOverviewPage />} />
            <Route path="/servers/maintenance" element={<ServersOverviewPage />} />
            <Route path="/servers/costs" element={<ServersOverviewPage />} />
            
            {/* Settings */}
            <Route path="/settings" element={<DashboardPage />} />
            <Route path="/settings/users" element={<DashboardPage />} />
            <Route path="/settings/roles" element={<DashboardPage />} />
            <Route path="/settings/audit" element={<DashboardPage />} />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
