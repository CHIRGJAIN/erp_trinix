import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  CalendarCheck,
  CreditCard,
  Gauge,
  LineChart,
  Lock,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Users2,
  Workflow,
  Wrench,
} from "lucide-react";

const modules = [
  {
    title: "Sales & CRM",
    description: "Capture leads, manage accounts, and convert quotes into invoices without losing context.",
    icon: Users2,
  },
  {
    title: "Inventory & Warehousing",
    description: "Track stock, transfers, and reorder points across every warehouse in real time.",
    icon: PackageCheck,
  },
  {
    title: "Finance & Billing",
    description: "Automate billing, reconcile payments, and maintain a unified ledger for every entity.",
    icon: CreditCard,
  },
  {
    title: "People & Payroll",
    description: "Centralize employee records, leave approvals, and payroll-ready attendance data.",
    icon: CalendarCheck,
  },
  {
    title: "Projects & Delivery",
    description: "Plan milestones, assign tasks, and keep teams aligned on priorities and timelines.",
    icon: Wrench,
  },
  {
    title: "IT & Servers",
    description: "Monitor service health, incidents, and maintenance windows with clear ownership.",
    icon: Gauge,
  },
];

const operationalDetails = [
  {
    title: "Unified operational model",
    description:
      "Standardize workflows across finance, inventory, HR, and IT so every department runs on the same source of truth.",
    icon: Workflow,
  },
  {
    title: "Decision-ready insights",
    description:
      "Surface live KPIs, margin trends, and expense signals before they become surprises.",
    icon: LineChart,
  },
  {
    title: "Governance by design",
    description:
      "Role-based access, approval chains, and audit-ready logs are built into every transaction.",
    icon: ShieldCheck,
  },
  {
    title: "Automation that scales",
    description:
      "Trigger recurring invoices, alerts, and task handoffs with flexible rules instead of manual follow-ups.",
    icon: Sparkles,
  },
];

const rolloutSteps = [
  {
    title: "Discover & map",
    description: "Align stakeholders, document processes, and define success metrics for every team.",
  },
  {
    title: "Configure & connect",
    description: "Set up modules, roles, and integrations that match how your business already works.",
  },
  {
    title: "Migrate & validate",
    description: "Bring in master data, verify reports, and run parallel checks before go-live.",
  },
  {
    title: "Launch & optimize",
    description: "Enable users with training, dashboards, and continuous improvement reviews.",
  },
];

const signalStats = [
  { label: "Core modules ready", value: "12+" },
  { label: "Automations included", value: "40+" },
  { label: "Standard reports", value: "80+" },
  { label: "Role templates", value: "10+" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-950">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute top-40 right-[-120px] h-[320px] w-[320px] rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-[-160px] h-[360px] w-[360px] rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25)_0,_transparent_45%)]" />

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Trinix</p>
              <p className="text-lg font-semibold">Trinix ERP</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#modules" className="transition hover:text-slate-900">Modules</a>
            <a href="#details" className="transition hover:text-slate-900">Details</a>
            <a href="#rollout" className="transition hover:text-slate-900">Rollout</a>
            <a href="#security" className="transition hover:text-slate-900">Security</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="secondary" asChild className="hidden md:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </header>

        <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-8">
          <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 animate-slide-up">
              <Badge variant="secondary" className="rounded-full bg-slate-900 text-white">
                Unified ERP for modern operations
              </Badge>
              <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
                Run every team on one operational spine.
              </h1>
              <p className="text-lg text-slate-600">
                Trinix ERP brings finance, inventory, sales, HR, and IT into a single workspace. 
                Stay audit-ready, automate routine handoffs, and get real-time clarity from every module.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/login">Get started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#modules">Explore modules</a>
                </Button>
              </div>
            
            </div>

            <div className="relative animate-fade-in">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-medium">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Operational Pulse</p>
                    <h2 className="text-2xl font-semibold text-slate-900">Live command view</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {signalStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                    >
                      <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                      <p className="text-sm text-slate-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Finance close</p>
                      <p className="text-2xl font-semibold">Ready for month-end</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                      <Lock className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-200">
                    Consolidate entities, lock approvals, and publish reports without spreadsheet sprawl.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-soft lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Boxes className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Inventory accuracy</p>
                    <p className="text-xs text-slate-500">Cycle counts aligned</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="modules" className="mt-20 animate-slide-up" style={{ animationDelay: "120ms" }}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Modules</p>
                <h2 className="text-3xl font-semibold text-slate-900">Every business system, connected.</h2>
              </div>
              <p className="max-w-xl text-sm text-slate-600">
                Replace isolated tools with a single ERP that keeps sales, operations, and finance moving in sync.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <div
                    key={module.title}
                    className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-medium"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">{module.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{module.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="details" className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "180ms" }}>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Operational detail</p>
              <h2 className="text-3xl font-semibold text-slate-900">The details that keep work moving.</h2>
              <p className="text-sm text-slate-600">
                Trinix ERP is designed for operational clarity. Every form, workflow, and report is tied back to
                governance so leaders can trust the data and teams can move faster.
              </p>
              <div className="grid gap-4">
                {operationalDetails.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <div key={detail.title} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-soft">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-slate-900">{detail.title}</p>
                          <p className="text-sm text-slate-600">{detail.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="security" className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-medium animate-fade-in">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Security & compliance</p>
              <h3 className="mt-3 text-2xl font-semibold">Secure by default.</h3>
              <p className="mt-2 text-sm text-slate-300">
                Protect sensitive financial and employee data with built-in access controls, approvals, and audit trails.
              </p>
              <div className="mt-6 grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Role-based access</p>
                    <p className="text-xs text-slate-300">Granular permissions for every module and workflow.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Approval controls</p>
                    <p className="text-xs text-slate-300">Multi-step approvals on expenses, invoices, and payouts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Audit-ready reporting</p>
                    <p className="text-xs text-slate-300">Immutable logs and exportable reporting packs.</p>
                  </div>
                </div>
              </div>
              <Button variant="secondary" asChild className="mt-8 w-full">
                <Link to="/login">Review access control</Link>
              </Button>
            </div>
          </section>

          <section id="rollout" className="mt-20 animate-slide-up" style={{ animationDelay: "240ms" }}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Rollout</p>
                <h2 className="text-3xl font-semibold text-slate-900">A clear path to go-live.</h2>
              </div>
              <p className="max-w-xl text-sm text-slate-600">
                Bring teams onto Trinix ERP without disruption using a structured rollout that keeps adoption high.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {rolloutSteps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20 rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-medium">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Why Trinix</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                  Built for leaders who want operational certainty.
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Get a single system for financial control, supply chain visibility, and people operations. 
                  Trinix ERP keeps your teams aligned with automated workflows, consistent data, and real-time reporting.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
                  <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                    <Users2 className="h-4 w-4" /> Cross-team visibility
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                    <PackageCheck className="h-4 w-4" /> Inventory precision
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                    <BarChart3 className="h-4 w-4" /> Board-ready reporting
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Detail highlights</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                      <span>Prebuilt approval chains for expenses, purchases, and reimbursements.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                      <span>Multi-entity consolidation with shared chart of accounts.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                      <span>Incident-ready operational status tracking for IT and facilities.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                      <span>Project profitability views with task-level cost control.</span>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-slate-200 bg-white/80">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-900">Trinix ERP</p>
              <p className="text-xs text-slate-500">
                A unified workspace for finance, operations, and people teams.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Enterprise operations
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Audit-ready controls
              </span>
              <span className="flex items-center gap-2">
                <Boxes className="h-4 w-4" /> Inventory precision
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
