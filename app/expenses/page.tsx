"use client";

import { useState } from "react";
import { ExpenseTable } from "@/components/expense-table";
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

const CATEGORIES = ["식비", "교통", "장비", "교육", "기타"] as const;

function fmtKRW(n: number) {
  if (isNaN(n) || n === 0) return "";
  return new Intl.NumberFormat("ko-KR").format(n) + "원";
}

export default function ExpensePage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    submittedBy: "",
    date: "",
    note: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist
    console.log("새 경비:", { ...form, amount: Number(form.amount) });
    setOpen(false);
    setForm({ title: "", amount: "", category: "", submittedBy: "", date: "", note: "" });
  }

  const amountNum = Number(form.amount.replace(/,/g, ""));

  return (
    <div className="m-4 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">경비 관리</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            경비 내역을 조회하고 승인 상태를 관리합니다.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>+ Create</Button>
      </div>

      <ExpenseTable />

      {/* ── Create Expense Sheet ── */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-2">
            <SheetTitle>경비 신청</SheetTitle>
            <SheetDescription>
              경비 내역을 입력하고 승인을 요청하세요.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-4 pt-4 pb-2">
            {/* 제목 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="예: 팀 점심 식사"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            {/* 금액 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                금액 (KRW) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="amount"
                  type="number"
                  min="0"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  placeholder="0"
                  className="h-9 w-full rounded-md border border-border bg-background pl-3 pr-16 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  KRW
                </span>
              </div>
              {amountNum > 0 && (
                <p className="text-xs text-muted-foreground">{fmtKRW(amountNum)}</p>
              )}
            </div>

            {/* 카테고리 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat}
                    className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      form.category === cat
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={form.category === cat}
                      onChange={handleChange}
                      className="sr-only"
                      required={form.category === ""}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* 제출자 ID */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                제출자 ID <span className="text-red-500">*</span>
              </label>
              <input
                name="submittedBy"
                value={form.submittedBy}
                onChange={handleChange}
                required
                placeholder="예: e3"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            {/* 날짜 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                날짜 <span className="text-red-500">*</span>
              </label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            {/* 메모 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">메모 (선택)</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={3}
                placeholder="추가 설명을 입력하세요..."
                className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            {/* 승인 상태 안내 */}
            <div className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
              💡 제출된 경비는 <strong className="text-foreground">pending</strong> 상태로 저장되며, 관리자 검토 후 승인됩니다.
            </div>

            <SheetFooter className="px-0 pt-2">
              <SheetClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  취소
                </Button>
              </SheetClose>
              <Button type="submit" className="flex-1">
                제출
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
