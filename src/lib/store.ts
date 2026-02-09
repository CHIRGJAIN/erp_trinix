import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User, Organization, Customer, Lead, Invoice, Product, Warehouse,
  Vendor, Expense, ExpenseCategory, Budget, Subscription, ReimbursementClaim,
  Employee, LeaveRequest, Project, Task, Server, ServiceApp, Incident,
  MaintenanceWindow, Notification, AuditLog
} from '@/types';
import { getDemoData } from './mock-data';

interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  organization: Organization | null;
  
  // Data
  users: User[];
  customers: Customer[];
  leads: Lead[];
  invoices: Invoice[];
  products: Product[];
  warehouses: Warehouse[];
  vendors: Vendor[];
  expenseCategories: ExpenseCategory[];
  expenses: Expense[];
  subscriptions: Subscription[];
  budgets: Budget[];
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  projects: Project[];
  tasks: Task[];
  servers: Server[];
  services: ServiceApp[];
  incidents: Incident[];
  maintenanceWindows: MaintenanceWindow[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  reimbursementClaims: ReimbursementClaim[];
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  initializeData: () => void;
  resetData: () => void;
  
  // CRUD Actions
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  addLead: (lead: Lead) => void;
  updateLead: (id: string, data: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, data: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  
  addProduct: (product: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, data: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, data: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  
  addExpenseCategory: (category: ExpenseCategory) => void;
  updateExpenseCategory: (id: string, data: Partial<ExpenseCategory>) => void;
  deleteExpenseCategory: (id: string) => void;
  
  addBudget: (budget: Budget) => void;
  updateBudget: (id: string, data: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  
  addSubscription: (subscription: Subscription) => void;
  updateSubscription: (id: string, data: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  addLeaveRequest: (request: LeaveRequest) => void;
  updateLeaveRequest: (id: string, data: Partial<LeaveRequest>) => void;
  
  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addTask: (task: Task) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  addServer: (server: Server) => void;
  updateServer: (id: string, data: Partial<Server>) => void;
  deleteServer: (id: string) => void;
  
  addService: (service: ServiceApp) => void;
  updateService: (id: string, data: Partial<ServiceApp>) => void;
  deleteService: (id: string) => void;
  
  addIncident: (incident: Incident) => void;
  updateIncident: (id: string, data: Partial<Incident>) => void;
  
  addMaintenanceWindow: (window: MaintenanceWindow) => void;
  updateMaintenanceWindow: (id: string, data: Partial<MaintenanceWindow>) => void;
  deleteMaintenanceWindow: (id: string) => void;
  
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  addAuditLog: (log: Omit<AuditLog, 'id' | 'createdAt'>) => void;
  
  addReimbursementClaim: (claim: ReimbursementClaim) => void;
  updateReimbursementClaim: (id: string, data: Partial<ReimbursementClaim>) => void;
  
  addUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentUser: null,
      isAuthenticated: false,
      organization: null,
      users: [],
      customers: [],
      leads: [],
      invoices: [],
      products: [],
      warehouses: [],
      vendors: [],
      expenseCategories: [],
      expenses: [],
      subscriptions: [],
      budgets: [],
      employees: [],
      leaveRequests: [],
      projects: [],
      tasks: [],
      servers: [],
      services: [],
      incidents: [],
      maintenanceWindows: [],
      notifications: [],
      auditLogs: [],
      reimbursementClaims: [],
      
      // Auth Actions
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const demoData = getDemoData();
        const user = demoData.users.find(u => u.email === email);
        
        if (user && password === 'demo123') {
          set({ 
            currentUser: user, 
            isAuthenticated: true,
            organization: demoData.organization,
          });
          get().initializeData();
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ 
          currentUser: null, 
          isAuthenticated: false,
          organization: null,
        });
      },
      
      initializeData: () => {
        const state = get();
        if (state.customers.length === 0) {
          const demoData = getDemoData();
          set({
            users: demoData.users,
            customers: demoData.customers,
            leads: demoData.leads,
            invoices: demoData.invoices,
            products: demoData.products,
            warehouses: demoData.warehouses,
            vendors: demoData.vendors,
            expenseCategories: demoData.expenseCategories,
            expenses: demoData.expenses,
            subscriptions: demoData.subscriptions,
            budgets: demoData.budgets,
            employees: demoData.employees,
            projects: demoData.projects,
            tasks: demoData.tasks,
            servers: demoData.servers,
            services: demoData.services,
            incidents: demoData.incidents,
            maintenanceWindows: demoData.maintenanceWindows,
            notifications: demoData.notifications,
            auditLogs: demoData.auditLogs,
          });
        }
      },
      
      resetData: () => {
        const demoData = getDemoData();
        set({
          users: demoData.users,
          customers: demoData.customers,
          leads: demoData.leads,
          invoices: demoData.invoices,
          products: demoData.products,
          warehouses: demoData.warehouses,
          vendors: demoData.vendors,
          expenseCategories: demoData.expenseCategories,
          expenses: demoData.expenses,
          subscriptions: demoData.subscriptions,
          budgets: demoData.budgets,
          employees: demoData.employees,
          leaveRequests: [],
          projects: demoData.projects,
          tasks: demoData.tasks,
          servers: demoData.servers,
          services: demoData.services,
          incidents: demoData.incidents,
          maintenanceWindows: demoData.maintenanceWindows,
          notifications: demoData.notifications,
          auditLogs: demoData.auditLogs,
          reimbursementClaims: [],
        });
      },
      
      // Customer CRUD
      addCustomer: (customer) => set((state) => ({ customers: [...state.customers, customer] })),
      updateCustomer: (id, data) => set((state) => ({
        customers: state.customers.map(c => c.id === id ? { ...c, ...data } : c)
      })),
      deleteCustomer: (id) => set((state) => ({
        customers: state.customers.filter(c => c.id !== id)
      })),
      
      // Lead CRUD
      addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
      updateLead: (id, data) => set((state) => ({
        leads: state.leads.map(l => l.id === id ? { ...l, ...data } : l)
      })),
      deleteLead: (id) => set((state) => ({
        leads: state.leads.filter(l => l.id !== id)
      })),
      
      // Invoice CRUD
      addInvoice: (invoice) => set((state) => ({ invoices: [...state.invoices, invoice] })),
      updateInvoice: (id, data) => set((state) => ({
        invoices: state.invoices.map(i => i.id === id ? { ...i, ...data } : i)
      })),
      deleteInvoice: (id) => set((state) => ({
        invoices: state.invoices.filter(i => i.id !== id)
      })),
      
      // Product CRUD
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, data) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...data } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
      
      // Vendor CRUD
      addVendor: (vendor) => set((state) => ({ vendors: [...state.vendors, vendor] })),
      updateVendor: (id, data) => set((state) => ({
        vendors: state.vendors.map(v => v.id === id ? { ...v, ...data } : v)
      })),
      deleteVendor: (id) => set((state) => ({
        vendors: state.vendors.filter(v => v.id !== id)
      })),
      
      // Expense CRUD
      addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
      updateExpense: (id, data) => set((state) => ({
        expenses: state.expenses.map(e => e.id === id ? { ...e, ...data } : e)
      })),
      deleteExpense: (id) => set((state) => ({
        expenses: state.expenses.filter(e => e.id !== id)
      })),
      
      // Expense Category CRUD
      addExpenseCategory: (category) => set((state) => ({ 
        expenseCategories: [...state.expenseCategories, category] 
      })),
      updateExpenseCategory: (id, data) => set((state) => ({
        expenseCategories: state.expenseCategories.map(c => c.id === id ? { ...c, ...data } : c)
      })),
      deleteExpenseCategory: (id) => set((state) => ({
        expenseCategories: state.expenseCategories.filter(c => c.id !== id)
      })),
      
      // Budget CRUD
      addBudget: (budget) => set((state) => ({ budgets: [...state.budgets, budget] })),
      updateBudget: (id, data) => set((state) => ({
        budgets: state.budgets.map(b => b.id === id ? { ...b, ...data } : b)
      })),
      deleteBudget: (id) => set((state) => ({
        budgets: state.budgets.filter(b => b.id !== id)
      })),
      
      // Subscription CRUD
      addSubscription: (subscription) => set((state) => ({ 
        subscriptions: [...state.subscriptions, subscription] 
      })),
      updateSubscription: (id, data) => set((state) => ({
        subscriptions: state.subscriptions.map(s => s.id === id ? { ...s, ...data } : s)
      })),
      deleteSubscription: (id) => set((state) => ({
        subscriptions: state.subscriptions.filter(s => s.id !== id)
      })),
      
      // Employee CRUD
      addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
      updateEmployee: (id, data) => set((state) => ({
        employees: state.employees.map(e => e.id === id ? { ...e, ...data } : e)
      })),
      deleteEmployee: (id) => set((state) => ({
        employees: state.employees.filter(e => e.id !== id)
      })),
      
      // Leave Request CRUD
      addLeaveRequest: (request) => set((state) => ({ 
        leaveRequests: [...state.leaveRequests, request] 
      })),
      updateLeaveRequest: (id, data) => set((state) => ({
        leaveRequests: state.leaveRequests.map(r => r.id === id ? { ...r, ...data } : r)
      })),
      
      // Project CRUD
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, data) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...data } : p)
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
      })),
      
      // Task CRUD
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, data) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...data } : t)
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),
      
      // Server CRUD
      addServer: (server) => set((state) => ({ servers: [...state.servers, server] })),
      updateServer: (id, data) => set((state) => ({
        servers: state.servers.map(s => s.id === id ? { ...s, ...data } : s)
      })),
      deleteServer: (id) => set((state) => ({
        servers: state.servers.filter(s => s.id !== id)
      })),
      
      // Service CRUD
      addService: (service) => set((state) => ({ services: [...state.services, service] })),
      updateService: (id, data) => set((state) => ({
        services: state.services.map(s => s.id === id ? { ...s, ...data } : s)
      })),
      deleteService: (id) => set((state) => ({
        services: state.services.filter(s => s.id !== id)
      })),
      
      // Incident CRUD
      addIncident: (incident) => set((state) => ({ incidents: [...state.incidents, incident] })),
      updateIncident: (id, data) => set((state) => ({
        incidents: state.incidents.map(i => i.id === id ? { ...i, ...data } : i)
      })),
      
      // Maintenance Window CRUD
      addMaintenanceWindow: (window) => set((state) => ({ 
        maintenanceWindows: [...state.maintenanceWindows, window] 
      })),
      updateMaintenanceWindow: (id, data) => set((state) => ({
        maintenanceWindows: state.maintenanceWindows.map(w => w.id === id ? { ...w, ...data } : w)
      })),
      deleteMaintenanceWindow: (id) => set((state) => ({
        maintenanceWindows: state.maintenanceWindows.filter(w => w.id !== id)
      })),
      
      // Notification Actions
      addNotification: (notification) => set((state) => ({ 
        notifications: [notification, ...state.notifications] 
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),
      
      // Audit Log Actions
      addAuditLog: (log) => set((state) => ({ 
        auditLogs: [{ ...log, id: generateId(), createdAt: new Date().toISOString() }, ...state.auditLogs] 
      })),
      
      // Reimbursement Claim CRUD
      addReimbursementClaim: (claim) => set((state) => ({ 
        reimbursementClaims: [...state.reimbursementClaims, claim] 
      })),
      updateReimbursementClaim: (id, data) => set((state) => ({
        reimbursementClaims: state.reimbursementClaims.map(c => c.id === id ? { ...c, ...data } : c)
      })),
      
      // User CRUD
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, data) => set((state) => ({
        users: state.users.map(u => u.id === id ? { ...u, ...data } : u)
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter(u => u.id !== id)
      })),
    }),
    {
      name: 'erp-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        organization: state.organization,
        users: state.users,
        customers: state.customers,
        leads: state.leads,
        invoices: state.invoices,
        products: state.products,
        warehouses: state.warehouses,
        vendors: state.vendors,
        expenseCategories: state.expenseCategories,
        expenses: state.expenses,
        subscriptions: state.subscriptions,
        budgets: state.budgets,
        employees: state.employees,
        leaveRequests: state.leaveRequests,
        projects: state.projects,
        tasks: state.tasks,
        servers: state.servers,
        services: state.services,
        incidents: state.incidents,
        maintenanceWindows: state.maintenanceWindows,
        notifications: state.notifications,
        auditLogs: state.auditLogs,
        reimbursementClaims: state.reimbursementClaims,
      }),
    }
  )
);
