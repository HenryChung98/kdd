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

export const defaultExpenses: Expense[] = [
  {
    id: "e1",
    title: "팀 점심 식사",
    amount: 85000,
    category: "식비",
    submittedBy: "e3",
    status: "approved",
    date: "2025-05-20",
  },
  {
    id: "e2",
    title: "개발 서적 구매",
    amount: 42000,
    category: "교육",
    submittedBy: "e3",
    status: "pending",
    date: "2025-05-25",
  },
  {
    id: "e3",
    title: "노트북 액세서리",
    amount: 135000,
    category: "장비",
    submittedBy: "e2",
    status: "approved",
    date: "2025-05-18",
  },
]

export function ExpenseTable() {
  const [expenses, setExpenses] = useState<Expense[]>(defaultExpenses)

  const handleEdit = (expense: Expense) => {
    console.log("수정:", expense)
    // 수정 로직 구현
  }

  const handleDelete = (expenseId: string) => {
    setExpenses(expenses.filter((e) => e.id !== expenseId))
    console.log("삭제:", expenseId)
  }
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>금액</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead>작성자</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>작성일</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => {
            return (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.submittedBy}</TableCell>
                <TableCell>{expense.status}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(expense)}>
                        edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(expense.id)}
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
