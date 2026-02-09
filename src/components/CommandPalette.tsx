import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog as Dialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  Users,
  FileText,
  Package,
  Receipt,
  Server,
  Settings,
  Plus,
  Search,
  AlertTriangle,
  Building,
  Briefcase,
} from 'lucide-react';
import { useStore } from '@/lib/store';

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandDialog({ open, onOpenChange }: CommandDialogProps) {
  const navigate = useNavigate();
  const { customers, invoices, servers, expenses } = useStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onOpenChange, open]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => navigate('/invoices/new'))}>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/expenses/new'))}>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/servers/new'))}>
            <Plus className="mr-2 h-4 w-4" />
            Add Server
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/servers/incidents/new'))}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Log Incident
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate('/dashboard'))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/customers'))}>
            <Users className="mr-2 h-4 w-4" />
            Customers
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/invoices'))}>
            <FileText className="mr-2 h-4 w-4" />
            Invoices
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/products'))}>
            <Package className="mr-2 h-4 w-4" />
            Products
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/expenses'))}>
            <Receipt className="mr-2 h-4 w-4" />
            Expenses
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/servers'))}>
            <Server className="mr-2 h-4 w-4" />
            Servers
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/projects'))}>
            <Briefcase className="mr-2 h-4 w-4" />
            Projects
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/settings'))}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent Customers">
          {customers.slice(0, 3).map((customer) => (
            <CommandItem
              key={customer.id}
              onSelect={() => runCommand(() => navigate(`/customers/${customer.id}`))}
            >
              <Building className="mr-2 h-4 w-4" />
              {customer.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Recent Servers">
          {servers.slice(0, 3).map((server) => (
            <CommandItem
              key={server.id}
              onSelect={() => runCommand(() => navigate(`/servers/${server.id}`))}
            >
              <Server className="mr-2 h-4 w-4" />
              {server.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Dialog>
  );
}
