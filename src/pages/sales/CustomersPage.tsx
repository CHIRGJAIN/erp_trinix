import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { PageHeader } from '@/components/ui/page-header';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge, getStatusVariant } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash,
  Eye,
  Mail,
  Phone,
  Building,
  Users,
} from 'lucide-react';
import type { Customer } from '@/types';

export default function CustomersPage() {
  const { customers, deleteCustomer } = useStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = () => {
    if (deleteId) {
      deleteCustomer(deleteId);
      toast({
        title: 'Customer deleted',
        description: 'The customer has been successfully removed.',
      });
      setDeleteId(null);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Customer',
      cell: (customer: Customer) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
            {customer.name.charAt(0)}
          </div>
          <div>
            <Link
              to={`/customers/${customer.id}`}
              className="font-medium hover:text-primary hover:underline"
            >
              {customer.name}
            </Link>
            {customer.company && (
              <p className="text-xs text-muted-foreground">{customer.company}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      cell: (customer: Customer) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {customer.email}
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      cell: (customer: Customer) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {customer.phone ? (
            <>
              <Phone className="h-4 w-4" />
              {customer.phone}
            </>
          ) : (
            <span className="text-muted-foreground/50">—</span>
          )}
        </div>
      ),
    },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      cell: (customer: Customer) => (
        <span className="font-medium">${customer.totalSpent.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (customer: Customer) => (
        <StatusBadge variant={getStatusVariant(customer.status)}>
          {customer.status}
        </StatusBadge>
      ),
    },
    {
      key: 'actions',
      header: '',
      cell: (customer: Customer) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}/edit`)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeleteId(customer.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: 'w-12',
    },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Customers"
        description="Manage your customer relationships and accounts."
        breadcrumbs={[{ label: 'Sales', href: '/customers' }, { label: 'Customers' }]}
        actions={
          <Button asChild>
            <Link to="/customers/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Link>
          </Button>
        }
      />

      <DataTable
        data={customers}
        columns={columns}
        searchable
        searchPlaceholder="Search customers..."
        searchKey="name"
        emptyState={{
          icon: <Users className="h-12 w-12" />,
          title: 'No customers yet',
          description: 'Get started by adding your first customer to the system.',
          action: (
            <Button asChild>
              <Link to="/customers/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Link>
            </Button>
          ),
        }}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              customer and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
