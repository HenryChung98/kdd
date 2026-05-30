"use client";

import { useState } from "react";
import { ProjectTable } from "@/components/project-table";
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

const PROJECT_STATUSES = [
  { value: "planning", label: "계획" },
  { value: "in_progress", label: "진행 중" },
  { value: "done", label: "완료" },
];

const PRIORITIES = [
  { value: "low", label: "낮음" },
  { value: "medium", label: "보통" },
  { value: "high", label: "높음" },
];

export default function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    status: "planning",
    ownerId: "",
    taskTitle: "",
    taskAssigneeId: "",
    taskPriority: "medium",
    taskDueDate: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist
    console.log("새 프로젝트:", form);
    setOpen(false);
    setForm({
      name: "",
      status: "planning",
      ownerId: "",
      taskTitle: "",
      taskAssigneeId: "",
      taskPriority: "medium",
      taskDueDate: "",
    });
  }

  return (
    <div className="m-4 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">프로젝트</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            프로젝트와 태스크를 조회하고 관리합니다.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>+ Create</Button>
      </div>

      <ProjectTable />

      {/* ── Create Project Sheet ── */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-2">
            <SheetTitle>새 프로젝트 생성</SheetTitle>
            <SheetDescription>
              프로젝트 정보를 입력하고 초기 태스크를 추가하세요.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-4 pt-4 pb-2">
            {/* Section: 프로젝트 기본 정보 */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                프로젝트 정보
              </p>

              {/* 프로젝트명 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">
                  프로젝트명 <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="예: 회사 허브 앱 개발"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>

              {/* 상태 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">
                  상태 <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition appearance-none"
                >
                  {PROJECT_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* 담당자 ID */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">
                  담당자 ID <span className="text-red-500">*</span>
                </label>
                <input
                  name="ownerId"
                  value={form.ownerId}
                  onChange={handleChange}
                  required
                  placeholder="예: e2"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Section: 초기 태스크 */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                초기 태스크 (선택)
              </p>

              {/* 태스크명 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">태스크명</label>
                <input
                  name="taskTitle"
                  value={form.taskTitle}
                  onChange={handleChange}
                  placeholder="예: UI 디자인"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>

              {/* 담당자 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">담당자 ID</label>
                <input
                  name="taskAssigneeId"
                  value={form.taskAssigneeId}
                  onChange={handleChange}
                  placeholder="예: e3"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>

              {/* 우선순위 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">우선순위</label>
                <div className="flex gap-2">
                  {PRIORITIES.map((p) => (
                    <label
                      key={p.value}
                      className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border py-2 text-xs font-medium transition ${
                        form.taskPriority === p.value
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="taskPriority"
                        value={p.value}
                        checked={form.taskPriority === p.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* 마감일 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">마감일</label>
                <input
                  name="taskDueDate"
                  type="date"
                  value={form.taskDueDate}
                  onChange={handleChange}
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
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
