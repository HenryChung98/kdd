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

interface Employee {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  managerId: string | null
}

export const defaultEmployees: Employee[] = [
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
]

export function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees)

  const handleEdit = (employee: Employee) => {
    console.log("수정:", employee)
    // 수정 로직 구현
  }

  const handleDelete = (employeeId: string) => {
    setEmployees(employees.filter((e) => e.id !== employeeId))
    console.log("삭제:", employeeId)
  }
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>직책</TableHead>
            <TableHead>부서</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>전화</TableHead>
            <TableHead>상위 관리자</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => {
            const manager = employees.find((e) => e.id === employee.managerId)
            return (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{manager?.name || "-"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(employee)}>
                        edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(employee.id)}
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
