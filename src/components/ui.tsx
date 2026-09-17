"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function PageHeader({
  title,
  lead,
  actions,
  className,
}: {
  title: string;
  lead?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">{title}</h1>
        {lead ? <p className="mt-2 text-base leading-relaxed text-ink-soft">{lead}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-3xl border border-line bg-paper p-5 shadow-soft sm:p-6", className)}>
      {children}
    </section>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra disabled:opacity-50",
        variant === "primary" && "bg-terra text-white hover:bg-terra-deep",
        variant === "secondary" && "bg-sage-soft text-sage hover:bg-sage/15",
        variant === "ghost" && "border border-line bg-paper text-ink hover:bg-cream-deep",
        variant === "danger" && "bg-terra/10 text-terra-deep hover:bg-terra/20",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra",
        variant === "primary" && "bg-terra text-white hover:bg-terra-deep",
        variant === "secondary" && "bg-sage-soft text-sage hover:bg-sage/15",
        variant === "ghost" && "border border-line bg-paper text-ink hover:bg-cream-deep",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-ink-soft">{hint}</span> : null}
    </label>
  );
}

const controlClass =
  "w-full rounded-2xl border border-line bg-cream px-3 py-2.5 text-base text-ink shadow-inner placeholder:text-ink-soft/70 focus:border-terra focus:outline-none focus:ring-2 focus:ring-terra/20";

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, "min-h-28 resize-y", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select className={cn(controlClass, className)} {...props}>
      {children}
    </select>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <Card className="border-dashed bg-cream/60 text-center">
      <div className="mx-auto max-w-md py-6">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-terra/10" aria-hidden />
        <h2 className="font-serif text-2xl text-ink">{title}</h2>
        <p className="mt-2 text-ink-soft">{body}</p>
        {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
      </div>
    </Card>
  );
}

export function Chip({
  selected,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "min-h-11 rounded-full border px-4 py-2 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra",
        selected
          ? "border-terra bg-terra text-white"
          : "border-line bg-paper text-ink hover:border-terra/40 hover:bg-cream-deep",
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label ? <p className="mb-1 text-sm text-ink-soft">{label}</p> : null}
      <div
        className="h-2 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full bg-terra transition-all" style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}
