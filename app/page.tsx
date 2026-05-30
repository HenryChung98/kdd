"use client";

import { employees, projects, expenses } from "@/lib/mock";
import type { Employee, Project, Expense } from "@/lib/mock";
import {
  Users,
  FolderKanban,
  Receipt,
  TrendingUp,
  CircleDot,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Wallet,
} from "lucide-react";
import Link from "next/link";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtKRW(n: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });
}

const PROJECT_STATUS_LABEL: Record<string, string> = {
  planning: "계획",
  in_progress: "진행 중",
  done: "완료",
};

const TASK_STATUS_LABEL: Record<string, string> = {
  todo: "할 일",
  in_progress: "진행 중",
  done: "완료",
};

const PRIORITY_LABEL: Record<string, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

// ─── KPI derived values ───────────────────────────────────────────────────────

const totalEmployees = employees.length;
const activeProjects = projects.filter((p) => p.status === "in_progress").length;
const pendingExpenses = expenses.filter((e) => e.status === "pending").length;
const totalExpenseAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
const approvedAmount = expenses
  .filter((e) => e.status === "approved")
  .reduce((sum, e) => sum + e.amount, 0);

// All tasks flattened
const allTasks = projects.flatMap((p) =>
  p.tasks.map((t) => ({
    ...t,
    projectName: p.name,
    projectId: p.id,
  }))
);
const pendingTasks = allTasks.filter((t) => t.status !== "done");

// Expense by category
const expenseByCategory = expenses.reduce<Record<string, number>>((acc, e) => {
  acc[e.category] = (acc[e.category] ?? 0) + e.amount;
  return acc;
}, {});

// Employees by department
const empByDept = employees.reduce<Record<string, Employee[]>>((acc, e) => {
  (acc[e.department] ??= []).push(e);
  return acc;
}, {});

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent ?? "bg-muted"}`}
        >
          <Icon size={16} className="text-foreground" />
        </span>
      </div>
      <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    planning: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    in_progress: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    todo: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    rejected: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300",
    high: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };
  const label =
    PROJECT_STATUS_LABEL[status] ??
    TASK_STATUS_LABEL[status] ??
    PRIORITY_LABEL[status] ??
    status;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${map[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {label}
    </span>
  );
}

function SectionHeader({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <Link
        href={href}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        전체 보기 <ArrowRight size={12} />
      </Link>
    </div>
  );
}

// ─── Project status ring visual ───────────────────────────────────────────────

function ProjectStatusBar() {
  const counts = {
    planning: projects.filter((p) => p.status === "planning").length,
    in_progress: projects.filter((p) => p.status === "in_progress").length,
    done: projects.filter((p) => p.status === "done").length,
  };
  const total = projects.length || 1;

  const bars = [
    { key: "in_progress", label: "진행 중", color: "bg-amber-400", count: counts.in_progress },
    { key: "planning", label: "계획", color: "bg-blue-400", count: counts.planning },
    { key: "done", label: "완료", color: "bg-emerald-400", count: counts.done },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Stacked bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full gap-0.5">
        {bars.map((b) =>
          b.count > 0 ? (
            <div
              key={b.key}
              className={`${b.color} transition-all`}
              style={{ width: `${(b.count / total) * 100}%` }}
              title={`${b.label}: ${b.count}`}
            />
          ) : null
        )}
      </div>
      {/* Legend */}
      <div className="flex gap-4">
        {bars.map((b) => (
          <div key={b.key} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-sm ${b.color}`} />
            <span className="text-xs text-muted-foreground">
              {b.label} <span className="font-semibold text-foreground">{b.count}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const getEmployeeName = (id: string) =>
    employees.find((e) => e.id === id)?.name ?? id;

  return (
    <div className="min-h-full bg-background px-6 py-7">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Company Hub 전체 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          icon={Users}
          label="총 직원"
          value={totalEmployees}
          sub={`${Object.keys(empByDept).length}개 부서`}
          accent="bg-blue-100 dark:bg-blue-900/40"
        />
        <KpiCard
          icon={FolderKanban}
          label="진행 중 프로젝트"
          value={activeProjects}
          sub={`전체 ${projects.length}개 프로젝트`}
          accent="bg-amber-100 dark:bg-amber-900/40"
        />
        <KpiCard
          icon={AlertCircle}
          label="승인 대기 경비"
          value={pendingExpenses}
          sub={`${expenses.length}건 중 대기`}
          accent="bg-red-100 dark:bg-red-900/40"
        />
        <KpiCard
          icon={Wallet}
          label="총 경비"
          value={fmtKRW(totalExpenseAmount)}
          sub={`승인 완료 ${fmtKRW(approvedAmount)}`}
          accent="bg-emerald-100 dark:bg-emerald-900/40"
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Projects column (spans 2) ─────────────────────── */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Project status overview */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <SectionHeader title="프로젝트 현황" href="/projects" />
            <ProjectStatusBar />

            {/* Project rows */}
            <div className="mt-4 divide-y divide-border">
              {projects.map((p) => {
                const done = p.tasks.filter((t) => t.status === "done").length;
                const total = p.tasks.length;
                const pct = total === 0 ? 0 : Math.round((done / total) * 100);
                return (
                  <div key={p.id} className="flex items-center gap-4 py-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="truncate text-sm font-medium text-foreground">
                          {p.name}
                        </span>
                        <StatusBadge status={p.status} />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-foreground/70 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {done}/{total} 태스크
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {getEmployeeName(p.ownerId)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pending tasks */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <SectionHeader title="진행 중 · 대기 태스크" href="/projects" />
            {pendingTasks.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                모든 태스크가 완료되었습니다 🎉
              </p>
            ) : (
              <div className="divide-y divide-border">
                {pendingTasks.map((t) => (
                  <div key={t.id} className="flex items-center gap-3 py-3">
                    <CircleDot
                      size={14}
                      className={
                        t.status === "in_progress"
                          ? "text-amber-500 shrink-0"
                          : "text-muted-foreground shrink-0"
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm text-foreground">{t.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.projectName} · {fmtDate(t.dueDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={t.priority} />
                      <span className="text-xs text-muted-foreground">
                        {getEmployeeName(t.assigneeId)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent expenses */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <SectionHeader title="최근 경비 내역" href="/expenses" />

            {/* Category totals */}
            <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {Object.entries(expenseByCategory).map(([cat, amt]) => (
                <div
                  key={cat}
                  className="rounded-lg bg-muted/60 p-2.5 text-center"
                >
                  <p className="text-[10px] text-muted-foreground">{cat}</p>
                  <p className="text-xs font-semibold text-foreground mt-0.5">
                    {fmtKRW(amt)}
                  </p>
                </div>
              ))}
            </div>

            {/* Expense rows */}
            <div className="divide-y divide-border">
              {expenses.map((e) => (
                <div key={e.id} className="flex items-center gap-3 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Receipt size={14} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {e.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {e.category} · {getEmployeeName(e.submittedBy)} · {fmtDate(e.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-foreground">
                      {fmtKRW(e.amount)}
                    </span>
                    <StatusBadge status={e.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* Employee list */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <SectionHeader title="직원 현황" href="/employees" />

            {/* Dept breakdown */}
            <div className="mb-4 space-y-2">
              {Object.entries(empByDept).map(([dept, emps]) => (
                <div key={dept} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{dept}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-foreground/60"
                        style={{
                          width: `${(emps.length / totalEmployees) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground w-4 text-right">
                      {emps.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Employee rows */}
            <div className="divide-y divide-border">
              {employees.map((emp) => {
                const manager = employees.find((e) => e.id === emp.managerId);
                return (
                  <div key={emp.id} className="flex items-center gap-3 py-3">
                    {/* Avatar placeholder */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
                      {emp.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{emp.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {emp.role} · {emp.department}
                      </p>
                    </div>
                    {manager && (
                      <span className="text-[11px] text-muted-foreground shrink-0">
                        ↑ {manager.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick stats */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-foreground">빠른 통계</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  완료 프로젝트
                </span>
                <span className="font-semibold">
                  {projects.filter((p) => p.status === "done").length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={14} className="text-amber-500" />
                  전체 태스크
                </span>
                <span className="font-semibold">{allTasks.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  완료 태스크
                </span>
                <span className="font-semibold">
                  {allTasks.filter((t) => t.status === "done").length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp size={14} className="text-blue-500" />
                  승인된 경비
                </span>
                <span className="font-semibold">
                  {expenses.filter((e) => e.status === "approved").length}건
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <BarChart3 size={14} className="text-purple-500" />
                  High 우선순위 태스크
                </span>
                <span className="font-semibold">
                  {allTasks.filter((t) => t.priority === "high").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
