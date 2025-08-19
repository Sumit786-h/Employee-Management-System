import React, { useState } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data, onUpdateTask }) => {
  if (!data) return null;

  const [filter, setFilter] = useState("all");

  const handleAccept = (task) => onUpdateTask(task, "active");
  const handleComplete = (task) => onUpdateTask(task, "completed");
  const handleFail = (task) => onUpdateTask(task, "failed");

  const tasks = Array.isArray(data.tasks) ? data.tasks : [];

  const filtered = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "new") return t.newTask;
    if (filter === "active") return t.active;
    if (filter === "completed") return t.completed;
    if (filter === "failed") return t.failed;
    return true;
  });

  return (
    <div id="tasklist" className="space-y-5">
      {filtered.length === 0 && (
        <div className="text-sm text-slate-400">No tasks to show.</div>
      )}

      {filtered.map((t, idx) => {
        if (t.newTask)
          return <NewTask key={idx} data={t} onAccept={() => handleAccept(t)} />;
        if (t.active)
          return (
            <AcceptTask
              key={idx}
              data={t}
              onComplete={() => handleComplete(t)}
              onFail={() => handleFail(t)}
            />
          );
        if (t.completed) return <CompleteTask key={idx} data={t} />;
        if (t.failed) return <FailedTask key={idx} data={t} />;

        return <NewTask key={idx} data={t} onAccept={() => handleAccept(t)} />;
      })}
    </div>
  );
};

export default TaskList;
