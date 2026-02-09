import { useStore } from '@/lib/store';
import { PageHeader } from '@/components/ui/page-header';
import { KPICard } from '@/components/ui/kpi-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge, getStatusVariant } from '@/components/ui/status-badge';
import { Link } from 'react-router-dom';
import { Server, Plus, Activity, AlertTriangle, DollarSign, Wrench, Gauge } from 'lucide-react';

export default function ServersOverviewPage() {
  const { servers, services, incidents, maintenanceWindows } = useStore();

  const onlineServers = servers.filter(s => s.status === 'online').length;
  const avgUptime = servers.length > 0 ? (servers.reduce((sum, s) => sum + s.uptime, 0) / servers.length).toFixed(2) : 0;
  const openIncidents = incidents.filter(i => i.status !== 'resolved').length;
  const monthlyCost = servers.reduce((sum, s) => sum + s.monthlyCost, 0);
  const prodServers = servers.filter(s => s.environment === 'production').length;

  return (
    <div className="page-container">
      <PageHeader
        title="Infrastructure Overview"
        description="Monitor servers, services, and infrastructure health."
        breadcrumbs={[{ label: 'Servers' }]}
        actions={
          <Button asChild>
            <Link to="/servers/new"><Plus className="mr-2 h-4 w-4" />Add Server</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Servers Online" value={`${onlineServers}/${servers.length}`} trend={onlineServers === servers.length ? 'up' : 'down'} icon={<Server className="h-5 w-5" />} />
        <KPICard title="Avg Uptime" value={`${avgUptime}%`} trend="up" icon={<Gauge className="h-5 w-5" />} />
        <KPICard title="Open Incidents" value={openIncidents} trend={openIncidents === 0 ? 'up' : 'down'} icon={<AlertTriangle className="h-5 w-5" />} />
        <KPICard title="Monthly Cost" value={`$${monthlyCost.toLocaleString()}`} icon={<DollarSign className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Server Status</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/servers/list">View all</Link></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {servers.slice(0, 5).map(server => (
                <div key={server.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${server.status === 'online' ? 'bg-green-500' : server.status === 'offline' ? 'bg-red-500' : 'bg-blue-500'}`} />
                    <div>
                      <Link to={`/servers/${server.id}`} className="font-medium text-sm hover:text-primary">{server.name}</Link>
                      <p className="text-xs text-muted-foreground">{server.provider} • {server.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{server.uptime}%</p>
                    <p className="text-xs text-muted-foreground">CPU: {server.cpuUsage}%</p>
                  </div>
                </div>
              ))}
              {servers.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No servers configured</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Incidents</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/servers/incidents">View all</Link></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incidents.slice(0, 5).map(incident => (
                <div key={incident.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-sm">{incident.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(incident.createdAt).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge variant={getStatusVariant(incident.status)}>{incident.status}</StatusBadge>
                </div>
              ))}
              {incidents.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No incidents recorded</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" asChild><Link to="/servers/list"><Server className="mr-2 h-4 w-4" />All Servers</Link></Button>
          <Button variant="outline" asChild><Link to="/servers/services"><Activity className="mr-2 h-4 w-4" />Services</Link></Button>
          <Button variant="outline" asChild><Link to="/servers/incidents/new"><AlertTriangle className="mr-2 h-4 w-4" />Log Incident</Link></Button>
          <Button variant="outline" asChild><Link to="/servers/maintenance"><Wrench className="mr-2 h-4 w-4" />Maintenance</Link></Button>
          <Button variant="outline" asChild><Link to="/servers/costs"><DollarSign className="mr-2 h-4 w-4" />Cost Report</Link></Button>
        </CardContent>
      </Card>
    </div>
  );
}
