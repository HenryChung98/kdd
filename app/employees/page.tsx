"use client";

import { useState } from "react";
import { EmployeeTable } from "@/components/employ-table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

const DEPARTMENTS = ["경영", "개발", "디자인", "마케팅", "인사", "재무"];
const ROLES = ["CEO", "CTO", "Manager", "Engineer", "Designer"];

export default function EmployeePage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    managerId: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist
    console.log("새 직원:", form);
    setOpen(false);
    setForm({ name: "", role: "", department: "", email: "", phone: "", managerId: "" });
  }

  return (
    <div className="m-4 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">직원 관리</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            전체 직원 목록을 조회하고 관리합니다.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>+ Create</Button>
      </div>

      <EmployeeTable />

      {/* ── Create Employee Sheet ── */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-2">
            <SheetTitle>새 직원 추가</SheetTitle>
            <SheetDescription>
              새로운 직원 정보를 입력하고 저장하세요.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-4 pt-4 pb-2">
            {/* 이름 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="홍길동"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            {/* 직책 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                직책 <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition appearance-none"
              >
                <option value="" disabled>선택하세요</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* 부서 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                부서 <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition appearance-none"
              >
                <option value="" disabled>선택하세요</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* 이메일 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="hong@company.com"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            {/* 전화 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">전화번호</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="010-0000-0000"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            {/* 상위 관리자 ID */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">상위 관리자 ID</label>
              <input
                name="managerId"
                value={form.managerId}
                onChange={handleChange}
                placeholder="e1 (선택사항)"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            <SheetFooter className="px-0 pt-2">
              <SheetClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  취소
                </Button>
              </SheetClose>
              <Button type="submit" className="flex-1">
                저장
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
