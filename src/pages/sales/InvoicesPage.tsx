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
  DropdownMenuSeparator,
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
  Send,
  CheckCircle,
  FileText,
  Download,
} from 'lucide-react';
import type { Invoice } from '@/types';
import { format } from 'date-fns';

export default function InvoicesPage() {
  const { invoices, updateInvoice, deleteInvoice } = useStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = () => {
    if (deleteId) {
      deleteInvoice(deleteId);
      toast({
        title: 'Invoice deleted',
        description: 'The invoice has been successfully removed.',
      });
      setDeleteId(null);
    }
  };

  const handleMarkAsPaid = (id: string) => {
    updateInvoice(id, { status: 'paid', paidAt: new Date().toISOString() });
    toast({
      title: 'Invoice marked as paid',
      description: 'The invoice status has been updated.',
    });
  };

  const handleSend = (id: string) => {
    updateInvoice(id, { status: 'sent' });
    toast({
      title: 'Invoice sent',
      description: 'The invoice has been sent to the customer.',
    });
  };

  const columns = [
    {
      key: 'number',
      header: 'Invoice',
      cell: (invoice: Invoice) => (
        <div>
          <Link
            to={`/invoices/${invoice.id}`}
            className="font-medium hover:text-primary hover:underline"
          >
            {invoice.number}
          </Link>
          <p className="text-xs text-muted-foreground">
            {format(new Date(invoice.createdAt), 'MMM d, yyyy')}
          </p>
        </div>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      cell: (invoice: Invoice) => (
        <span className="text-sm">{invoice.customerName}</span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      cell: (invoice: Invoice) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
        </span>
      ),
    },
    {
      key: 'total',
      header: 'Amount',
      cell: (invoice: Invoice) => (
        <span className="font-medium">${invoice.total.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (invoice: Invoice) => (
        <StatusBadge variant={getStatusVariant(invoice.status)}>
          {invoice.status}
        </StatusBadge>
      ),
    },
    {
      key: 'actions',
      header: '',
      cell: (invoice: Invoice) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/invoices/${invoice.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/invoices/${invoice.id}/edit`)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {invoice.status === 'draft' && (
              <DropdownMenuItem onClick={() => handleSend(invoice.id)}>
                <Send className="mr-2 h-4 w-4" />
                Send Invoice
              </DropdownMenuItem>
            )}
            {['pending', 'sent'].includes(invoice.status) && (
              <DropdownMenuItem onClick={() => handleMarkAsPaid(invoice.id)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Paid
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setDeleteId(invoice.id)}
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

  // Calculate summary stats
  const totalValue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidValue = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const pendingValue = invoices.filter(i => ['pending', 'sent'].includes(i.status)).reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="page-container">
      <PageHeader
        title="Invoices"
        description="Create and manage customer invoices."
        breadcrumbs={[{ label: 'Sales', href: '/invoices' }, { label: 'Invoices' }]}
        actions={
          <Button asChild>
            <Link to="/invoices/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Link>
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Invoiced</p>
          <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Paid</p>
          <p className="text-2xl font-bold text-green-600">${paidValue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Outstanding</p>
          <p className="text-2xl font-bold text-amber-600">${pendingValue.toLocaleString()}</p>
        </div>
      </div>

      <DataTable
        data={invoices}
        columns={columns}
        searchable
        searchPlaceholder="Search invoices..."
        searchKey="number"
        emptyState={{
          icon: <FileText className="h-12 w-12" />,
          title: 'No invoices yet',
          description: 'Create your first invoice to start tracking payments.',
          action: (
            <Button asChild>
              <Link to="/invoices/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Link>
            </Button>
          ),
        }}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete invoice?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              invoice and all associated data.
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
