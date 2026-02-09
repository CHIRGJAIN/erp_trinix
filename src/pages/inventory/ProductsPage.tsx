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
  Package,
  AlertTriangle,
} from 'lucide-react';
import type { Product } from '@/types';

export default function ProductsPage() {
  const { products, deleteProduct } = useStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      toast({
        title: 'Product deleted',
        description: 'The product has been successfully removed.',
      });
      setDeleteId(null);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Product',
      cell: (product: Product) => (
        <div>
          <Link
            to={`/products/${product.id}`}
            className="font-medium hover:text-primary hover:underline"
          >
            {product.name}
          </Link>
          <p className="text-xs text-muted-foreground">{product.sku}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      cell: (product: Product) => (
        <span className="text-sm">{product.category}</span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      cell: (product: Product) => (
        <div>
          <p className="font-medium">${product.sellingPrice.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Cost: ${product.purchasePrice.toLocaleString()}</p>
        </div>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      cell: (product: Product) => {
        const isLow = product.currentStock <= product.reorderLevel;
        return (
          <div className="flex items-center gap-2">
            <span className={`font-medium ${isLow ? 'text-destructive' : ''}`}>
              {product.currentStock}
            </span>
            {isLow && <AlertTriangle className="h-4 w-4 text-destructive" />}
          </div>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      cell: (product: Product) => (
        <StatusBadge variant={getStatusVariant(product.status)}>
          {product.status}
        </StatusBadge>
      ),
    },
    {
      key: 'actions',
      header: '',
      cell: (product: Product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/products/${product.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/products/${product.id}/edit`)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeleteId(product.id)}
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
  const totalValue = products.reduce((sum, p) => sum + p.currentStock * p.sellingPrice, 0);
  const lowStockCount = products.filter(p => p.currentStock <= p.reorderLevel).length;

  return (
    <div className="page-container">
      <PageHeader
        title="Products"
        description="Manage your product catalog and inventory."
        breadcrumbs={[{ label: 'Inventory', href: '/products' }, { label: 'Products' }]}
        actions={
          <Button asChild>
            <Link to="/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Inventory Value</p>
          <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Low Stock Items</p>
          <p className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-destructive' : ''}`}>
            {lowStockCount}
          </p>
        </div>
      </div>

      <DataTable
        data={products}
        columns={columns}
        searchable
        searchPlaceholder="Search products..."
        searchKey="name"
        emptyState={{
          icon: <Package className="h-12 w-12" />,
          title: 'No products yet',
          description: 'Add your first product to start managing inventory.',
          action: (
            <Button asChild>
              <Link to="/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          ),
        }}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and all associated data.
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
