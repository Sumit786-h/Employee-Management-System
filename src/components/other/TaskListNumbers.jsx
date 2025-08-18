import React, { useEffect, useState } from "react";

const Counter = ({ target }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const duration = 500;
    const steps = Math.max(10, target * 10);
    const increment = target / steps;
    let curr = 0;
    const id = setInterval(() => {
      curr += increment;
      if (curr >= target) {
        setVal(target);
        clearInterval(id);
      } else setVal(Math.floor(curr));
    }, duration / steps);
    return () => clearInterval(id);
  }, [target]);
  return <>{val}</>;
};

const StatCard = ({ label, value, tint, icon }) => (
  <div className="rounded-2xl p-5 bg-[linear-gradient(180deg,#0f172a_0%,#0b1324_100%)] border border-slate-700/60 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_35px_-12px_rgba(0,0,0,0.7)] transition">
    <div className="flex items-center justify-between">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className={`text-lg ${tint}`}>{icon}</div>
    </div>
    <div className={`mt-2 text-4xl font-extrabold leading-none ${tint}`}>
      <Counter target={value} />
    </div>
  </div>
);

const TaskListNumbers = ({ data }) => {
  if (!data) return null;
  const c = {
    newTask: data.taskCounts?.newTask ?? 0,
    active: data.taskCounts?.active ?? 0,
    completed: data.taskCounts?.completed ?? 0,
    failed: data.taskCounts?.failed ?? 0,
  };

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard label="New" value={c.newTask} tint="text-sky-400" icon="🆕" />
      <StatCard label="Active" value={c.active} tint="text-amber-400" icon="⚡" />
      <StatCard label="Completed" value={c.completed} tint="text-emerald-400" icon="✅" />
      <StatCard label="Failed" value={c.failed} tint="text-rose-400" icon="⚠️" />
    </section>
  );
};

export default TaskListNumbers;
