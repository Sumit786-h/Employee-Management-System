import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthProvider";

/**
 * Small colored pill that reflects the task status.
 */
const StatusPill = ({ status }) => {
  const map = {
    New: "bg-sky-900/60 text-sky-300 border-sky-700",
    Active: "bg-amber-900/60 text-amber-300 border-amber-700",
    Completed: "bg-emerald-900/60 text-emerald-300 border-emerald-700",
    Failed: "bg-rose-900/60 text-rose-300 border-rose-700",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[11px] leading-none border ${
        map[status] || "bg-slate-800 text-slate-300 border-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

/**
 * A single task row. Option A: dates removed (category only).
 */
const TaskRow = ({ t }) => {
  const status = t.newTask
    ? "New"
    : t.active
    ? "Active"
    : t.completed
    ? "Completed"
    : t.failed
    ? "Failed"
    : "";

  return (
    <li className="flex items-center justify-between gap-3 py-2 border-b border-slate-800/60 last:border-b-0">
      <div className="min-w-0">
        <div className="truncate font-medium">{t.taskTitle}</div>
        <div className="mt-0.5 text-xs text-slate-300/80 truncate">{t.category}</div>
      </div>
      <StatusPill status={status} />
    </li>
  );
};

/**
 * Employee card with:
 * - Top gradient accent
 * - Dark-glass header (name/email)
 * - Slightly tinted body background (below area)
 */
const EmployeeCard = ({ u }) => {
  const tasks = Array.isArray(u.tasks) ? u.tasks : [];

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/70 overflow-hidden">
      {/* Top accent bar (teal → indigo → emerald) */}
      <div className="h-[3px] w-full bg-[linear-gradient(90deg,#22d3ee_0%,#818cf8_50%,#34d399_100%)]" />

      {/* Header: darker glass tint */}
      <div className="px-4 py-3 bg-slate-800/60 backdrop-blur-sm border-b border-slate-700/70">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold truncate">{u.firstName}</div>
            <div className="text-xs text-slate-300 truncate">{u.email}</div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-300">
            <span>New: {u.taskCounts?.newTask ?? 0}</span>
            <span>Active: {u.taskCounts?.active ?? 0}</span>
            <span>Completed: {u.taskCounts?.completed ?? 0}</span>
            <span>Failed: {u.taskCounts?.failed ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Body: slightly lighter tint than header for layered depth */}
      <div className="bg-slate-800/40">
        <ul className="px-4">
          {tasks.length > 0 ? (
            tasks.map((t, idx) => <TaskRow key={idx} t={t} />)
          ) : (
            <li className="py-3 text-sm text-slate-400">No tasks</li>
          )}
        </ul>
      </div>
    </div>
  );
};

/**
 * AllTask root: renders a list of employees with their tasks.
 */
const AllTask = () => {
  const [userData] = useContext(AuthContext);
  const employees = useMemo(() => userData || [], [userData]);

  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">All Tasks</h2>
        <div className="h-px flex-1 ml-4 bg-slate-800/70" />
      </div>

      <div className="space-y-5">
        {employees.map((u) => (
          <EmployeeCard key={u.id} u={u} />
        ))}
      </div>
    </section>
  );
};

export default AllTask;
