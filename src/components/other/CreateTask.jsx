import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const initial = {
  taskTitle: "",
  taskDescription: "",
  taskDate: "",
  asignTo: "",
  category: "",
};

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [form, setForm] = useState(initial);

  const employees = useMemo(() => userData || [], [userData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.taskTitle.trim()) return "Task title is required";
    if (!form.taskDescription.trim()) return "Task description is required";
    if (!form.taskDate) return "Due date is required";
    if (!form.asignTo) return "Assign to is required";
    if (!form.category.trim()) return "Category is required";
    return null;
  };

  const recalcCounts = (tasks) => {
    const taskCounts = { active: 0, newTask: 0, completed: 0, failed: 0 };
    tasks.forEach((t) => {
      if (t.active) taskCounts.active++;
      else if (t.newTask) taskCounts.newTask++;
      else if (t.completed) taskCounts.completed++;
      else if (t.failed) taskCounts.failed++;
    });
    return taskCounts;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    const newTask = {
      taskTitle: form.taskTitle.trim(),
      taskDescription: form.taskDescription.trim(),
      taskDate: form.taskDate,
      category: form.category.trim(),
      active: false,
      newTask: true,
      completed: false,
      failed: false,
    };

    const target = employees.find(
      (u) => String(u.id) === String(form.asignTo) || u.firstName === form.asignTo
    );
    if (!target) return alert("Selected employee not found");

    const updatedData = employees.map((u) => {
      if (u.id === target.id) {
        const tasks = [...(u.tasks || []), newTask];
        return { ...u, tasks, taskCounts: recalcCounts(tasks) };
      }
      return u;
    });

    setUserData(updatedData);
    localStorage.setItem("employees", JSON.stringify(updatedData));

    setForm(initial);
    alert("Task created and assigned");
  };

  return (
    <div className="rounded-xl border border-slate-700/60 p-5 bg-slate-900/40">
      <h2 className="text-xl font-semibold mb-4">Create Task</h2>
      <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="text-sm text-slate-300">Title</label>
          <input
            className="w-full mt-1 px-3 py-2 rounded bg-slate-800 border border-slate-700 outline-none"
            name="taskTitle"
            value={form.taskTitle}
            onChange={onChange}
            placeholder="Task title"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-slate-300">Description</label>
          <textarea
            className="w-full mt-1 px-3 py-2 rounded bg-slate-800 border border-slate-700 outline-none"
            name="taskDescription"
            value={form.taskDescription}
            onChange={onChange}
            placeholder="What needs to be done?"
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Due date</label>
          <input
            type="date"
            className="w-full mt-1 px-3 py-2 rounded bg-slate-800 border border-slate-700 outline-none"
            name="taskDate"
            value={form.taskDate}
            onChange={onChange}
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Category</label>
          <input
            className="w-full mt-1 px-3 py-2 rounded bg-slate-800 border border-slate-700 outline-none"
            name="category"
            value={form.category}
            onChange={onChange}
            placeholder="Design, Dev, Meeting..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-slate-300">Assign to</label>
          <select
            className="w-full mt-1 px-3 py-2 rounded bg-slate-800 border border-slate-700 outline-none"
            name="asignTo"
            value={form.asignTo}
            onChange={onChange}
          >
            <option value="">Select employee</option>
            {employees.map((u) => (
              <option key={u.id} value={u.id}>
                {u.firstName} ({u.email})
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 transition">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
