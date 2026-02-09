// Core Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  organizationId: string;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive' | 'pending';
}

export type UserRole = 'owner' | 'admin' | 'finance' | 'sales' | 'inventory' | 'hr' | 'devops' | 'viewer';

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  address?: string;
  currency: string;
  fiscalYearStart: string;
  createdAt: string;
}

export interface Permission {
  module: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

// Sales Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  totalSpent: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'proposal' | 'won' | 'lost';
  value: number;
  source?: string;
  assignedTo?: string;
  createdAt: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'pending' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  createdAt: string;
  paidAt?: string;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  method: 'cash' | 'bank_transfer' | 'card' | 'cheque';
  reference?: string;
  date: string;
  notes?: string;
}

// Inventory Types
export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: string;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  taxRate: number;
  reorderLevel: number;
  currentStock: number;
  warehouseId: string;
  barcode?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Warehouse {
  id: string;
  name: string;
  address?: string;
  isDefault: boolean;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  warehouseId: string;
  type: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  reference?: string;
  notes?: string;
  createdAt: string;
  createdBy: string;
}

// Vendor Types
export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  paymentTerms?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  totalPurchases: number;
}

export interface PurchaseOrder {
  id: string;
  number: string;
  vendorId: string;
  vendorName: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'pending' | 'approved' | 'received' | 'cancelled';
  expectedDate?: string;
  createdAt: string;
  notes?: string;
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
  receivedQuantity: number;
}

// Expense Types
export interface Expense {
  id: string;
  title: string;
  amount: number;
  tax: number;
  total: number;
  category: string;
  categoryId: string;
  vendor?: string;
  vendorId?: string;
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'cheque';
  paidBy: 'company' | 'employee';
  employeeId?: string;
  employeeName?: string;
  reimbursable: boolean;
  projectId?: string;
  projectName?: string;
  costCenter?: string;
  tags: string[];
  receiptUrl?: string;
  notes?: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'paid' | 'reimbursed';
  date: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  budgetLimit?: number;
  parentId?: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  categoryName: string;
  amount: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  spent: number;
  alertThreshold: number;
  startDate: string;
  endDate: string;
}

export interface Subscription {
  id: string;
  vendor: string;
  vendorId?: string;
  plan: string;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  amount: number;
  currency: string;
  nextRenewal: string;
  status: 'active' | 'cancelled' | 'paused';
  owner: string;
  ownerId: string;
  paymentMethod: string;
  categoryId: string;
  notes?: string;
  createdAt: string;
}

export interface ReimbursementClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  expenses: string[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  reimbursedAt?: string;
}

// HR Types
export interface Employee {
  id: string;
  employeeId: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  manager?: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  avatar?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'sick' | 'personal' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'leave';
  notes?: string;
}

export interface PayrollRun {
  id: string;
  month: string;
  year: number;
  status: 'draft' | 'processing' | 'completed';
  totalAmount: number;
  employeeCount: number;
  createdAt: string;
  processedAt?: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  budget?: number;
  spent: number;
  managerId?: string;
  managerName?: string;
  members: string[];
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  projectName: string;
  assigneeId?: string;
  assigneeName?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

// Server Tracker Types
export interface Server {
  id: string;
  name: string;
  provider: 'aws' | 'digitalocean' | 'hostinger' | 'linode' | 'vultr' | 'azure' | 'gcp' | 'other';
  region: string;
  environment: 'production' | 'staging' | 'development';
  publicIp: string;
  hostname?: string;
  os: string;
  cpu: string;
  ram: string;
  disk: string;
  sshPort: number;
  firewallEnabled: boolean;
  monitoringEnabled: boolean;
  monthlyCost: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  renewalDate: string;
  status: 'online' | 'offline' | 'maintenance' | 'unknown';
  uptime: number;
  lastCheck?: string;
  cpuUsage?: number;
  ramUsage?: number;
  diskUsage?: number;
  tags: string[];
  ownerId: string;
  ownerName: string;
  notes?: string;
  securityChecklist: {
    sshKeys: boolean;
    fail2ban: boolean;
    firewall: boolean;
    backups: boolean;
  };
  createdAt: string;
}

export interface ServiceApp {
  id: string;
  name: string;
  serverId: string;
  serverName: string;
  domain?: string;
  status: 'running' | 'stopped' | 'error' | 'maintenance';
  deployMethod: 'docker' | 'pm2' | 'systemd' | 'manual' | 'kubernetes';
  ports: string[];
  repoUrl?: string;
  lastDeployAt?: string;
  ownerId: string;
  ownerName: string;
  healthCheckUrl?: string;
  createdAt: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedServers: string[];
  affectedServices: string[];
  status: 'open' | 'investigating' | 'mitigated' | 'resolved';
  impact: string;
  startTime: string;
  endTime?: string;
  timeline: IncidentEvent[];
  resolution?: string;
  createdBy: string;
  createdAt: string;
}

export interface IncidentEvent {
  id: string;
  timestamp: string;
  description: string;
  createdBy: string;
}

export interface Postmortem {
  id: string;
  incidentId: string;
  incidentTitle: string;
  rootCause: string;
  contributingFactors: string[];
  actionItems: string[];
  lessonsLearned?: string;
  createdAt: string;
  createdBy: string;
}

export interface MaintenanceWindow {
  id: string;
  serverId?: string;
  serverName?: string;
  serviceId?: string;
  serviceName?: string;
  reason: string;
  scheduledStart: string;
  scheduledEnd: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notifyTeams: string[];
  createdBy: string;
  createdAt: string;
}

export interface AlertRule {
  id: string;
  serverId: string;
  serverName: string;
  metric: 'cpu' | 'ram' | 'disk' | 'uptime';
  condition: 'above' | 'below';
  threshold: number;
  enabled: boolean;
  notifyChannels: string[];
  createdAt: string;
}

export interface CostEntry {
  id: string;
  serverId: string;
  serverName: string;
  amount: number;
  currency: string;
  period: string;
  invoiceUrl?: string;
  paidAt?: string;
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  module: 'erp' | 'expense' | 'servers';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

// Audit Log Types
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
  ipAddress?: string;
  createdAt: string;
}

// Finance Types
export interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  balance: number;
  parentId?: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  accountId: string;
  accountName: string;
  amount: number;
  description: string;
  reference?: string;
  category?: string;
  date: string;
  createdAt: string;
}
