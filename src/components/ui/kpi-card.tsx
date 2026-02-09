import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  loading?: boolean;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon,
  trend,
  className,
  loading = false,
}: KPICardProps) {
  const trendColor =
    trend === 'up'
      ? 'text-green-600 dark:text-green-400'
      : trend === 'down'
      ? 'text-red-600 dark:text-red-400'
      : 'text-muted-foreground';

  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;

  if (loading) {
    return (
      <Card className={cn('card-metric', className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-8 w-24" />
              <div className="skeleton h-3 w-16" />
            </div>
            <div className="skeleton h-10 w-10 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('card-metric', className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="kpi-label">{title}</p>
            <p className="kpi-value">{value}</p>
            {(change !== undefined || changeLabel) && (
              <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
                {trend && <TrendIcon className="h-3 w-3" />}
                {change !== undefined && (
                  <span>
                    {change > 0 ? '+' : ''}
                    {change}%
                  </span>
                )}
                {changeLabel && (
                  <span className="text-muted-foreground">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
