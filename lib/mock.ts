// ─── Employee Directory ───────────────────────────────────────────────────────

export type Role = "CEO" | "CTO" | "Engineer" | "Designer" | "Manager";

export interface Employee {
  id: string;
  name: string;
  role: Role;
  department: string;
  email: string;
  phone: string;
  managerId: string | null;
}

export const employees: Employee[] = [
  {
    id: "e1",
    name: "김지훈",
    role: "CEO",
    department: "경영",
    email: "jihoon.kim@company.com",
    phone: "010-1234-5678",
    managerId: null,
  },
  {
    id: "e2",
    name: "이수연",
    role: "CTO",
    department: "개발",
    email: "suyeon.lee@company.com",
    phone: "010-2345-6789",
    managerId: "e1",
  },
  {
    id: "e3",
    name: "박민준",
    role: "Engineer",
    department: "개발",
    email: "minjun.park@company.com",
    phone: "010-3456-7890",
    managerId: "e2",
  },
];

// ─── Project & Task Tracking ──────────────────────────────────────────────────

export type ProjectStatus = "planning" | "in_progress" | "done";
export type TaskStatus = "todo" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  assigneeId: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  ownerId: string;
  tasks: Task[];
}

export const projects: Project[] = [
  {
    id: "p1",
    name: "회사 허브 앱 개발",
    status: "in_progress",
    ownerId: "e2",
    tasks: [
      {
        id: "t1",
        title: "요구사항 정의",
        assigneeId: "e2",
        status: "done",
        priority: "high",
        dueDate: "2025-05-10",
      },
      {
        id: "t2",
        title: "UI 디자인",
        assigneeId: "e3",
        status: "in_progress",
        priority: "medium",
        dueDate: "2025-06-01",
      },
    ],
  },
  {
    id: "p2",
    name: "사내 보안 감사",
    status: "planning",
    ownerId: "e1",
    tasks: [
      {
        id: "t3",
        title: "보안 체크리스트 작성",
        assigneeId: "e2",
        status: "todo",
        priority: "high",
        dueDate: "2025-06-15",
      },
    ],
  },
  {
    id: "p3",
    name: "온보딩 프로세스 개선",
    status: "done",
    ownerId: "e1",
    tasks: [
      {
        id: "t4",
        title: "온보딩 문서 작성",
        assigneeId: "e3",
        status: "done",
        priority: "low",
        dueDate: "2025-04-20",
      },
    ],
  },
];

// ─── Finance & Admin ──────────────────────────────────────────────────────────

export type ExpenseCategory = "식비" | "교통" | "장비" | "교육" | "기타";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface Expense {
  id: string;
  title: string;
  amount: number; // KRW
  category: ExpenseCategory;
  submittedBy: string; // employeeId
  status: ApprovalStatus;
  date: string;
}

export const expenses: Expense[] = [
  {
    id: "ex1",
    title: "팀 점심 식사",
    amount: 85000,
    category: "식비",
    submittedBy: "e3",
    status: "approved",
    date: "2025-05-20",
  },
  {
    id: "ex2",
    title: "개발 서적 구매",
    amount: 42000,
    category: "교육",
    submittedBy: "e3",
    status: "pending",
    date: "2025-05-25",
  },
  {
    id: "ex3",
    title: "노트북 액세서리",
    amount: 135000,
    category: "장비",
    submittedBy: "e2",
    status: "approved",
    date: "2025-05-18",
  },
];