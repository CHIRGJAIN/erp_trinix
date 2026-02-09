import { cn } from '@/lib/utils';

type StatusVariant = 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'default'
  | 'draft'
  | 'pending'
  | 'paid'
  | 'overdue'
  | 'cancelled'
  | 'online'
  | 'offline'
  | 'maintenance';

interface StatusBadgeProps {
  variant?: StatusVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<StatusVariant, string> = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  default: 'bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-400',
  draft: 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400',
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  overdue: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  cancelled: 'bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-500',
  online: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  offline: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  maintenance: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

const dotStyles: Record<StatusVariant, string> = {
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  default: 'bg-slate-500',
  draft: 'bg-slate-400',
  pending: 'bg-amber-500',
  paid: 'bg-green-500',
  overdue: 'bg-red-500',
  cancelled: 'bg-slate-400',
  online: 'bg-green-500',
  offline: 'bg-red-500',
  maintenance: 'bg-blue-500',
};

export function StatusBadge({ variant = 'default', children, className, dot = false }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[variant])} />
      )}
      {children}
    </span>
  );
}

// Helper function to get status variant from status string
export function getStatusVariant(status: string): StatusVariant {
  const statusMap: Record<string, StatusVariant> = {
    // Invoice statuses
    draft: 'draft',
    pending: 'pending',
    sent: 'info',
    paid: 'paid',
    overdue: 'overdue',
    cancelled: 'cancelled',
    
    // Expense statuses
    submitted: 'pending',
    approved: 'success',
    rejected: 'error',
    reimbursed: 'success',
    
    // Server statuses
    online: 'online',
    offline: 'offline',
    maintenance: 'maintenance',
    unknown: 'default',
    
    // General
    active: 'success',
    inactive: 'default',
    completed: 'success',
    in_progress: 'info',
    todo: 'default',
    review: 'warning',
    done: 'success',
    
    // Incident statuses
    open: 'error',
    investigating: 'warning',
    mitigated: 'info',
    resolved: 'success',
    
    // Leave statuses
    annual: 'info',
    sick: 'warning',
    personal: 'default',
    unpaid: 'draft',
    
    // Lead statuses
    new: 'info',
    contacted: 'pending',
    proposal: 'warning',
    won: 'success',
    lost: 'error',
    
    // Service statuses
    running: 'success',
    stopped: 'error',
    error: 'error',
    
    // Subscription statuses
    paused: 'warning',
    
    // Default
    default: 'default',
  };
  
  return statusMap[status.toLowerCase()] || 'default';
}
