"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import { employees } from "@/lib/mock"

interface Employee {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  managerId: string | null
}

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

export const defaultProjects: Project[] = [
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

function getEmployeeName(id: string) {
  return employees.find((e) => e.id === id)?.name ?? id
}

export function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)

  const handleEdit = (project: Project) => {
    console.log("수정:", project)
    // 수정 로직 구현
  }

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter((e) => e.id !== projectId))
    console.log("삭제:", projectId)
  }
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>프로젝트</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>담당자</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const manager = projects.find((e) => e.id === project.ownerId)
            return (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{getEmployeeName(project.ownerId)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(project)}>
                        edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600"
                      >
                        delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
