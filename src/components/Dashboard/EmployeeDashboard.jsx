import React, { useContext } from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import { AuthContext } from "../../context/AuthProvider";

const EmployeeDashboard = ({ changeUser, data }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const sameTask = (a, b) =>
    a.taskTitle === b.taskTitle &&
    a.taskDate === b.taskDate &&
    a.category === b.category &&
    a.taskDescription === b.taskDescription;

  const recalcCounts = (tasks) => {
    const c = { active: 0, newTask: 0, completed: 0, failed: 0 };
    tasks.forEach((t) => {
      if (t.active) c.active++;
      else if (t.newTask) c.newTask++;
      else if (t.completed) c.completed++;
      else if (t.failed) c.failed++;
    });
    return c;
  };

  const handleUpdateTask = (task, status) => {
    const updated = userData.map((u) => {
      if (u.id === data.id) {
        const nextTasks = (u.tasks || []).map((t) => {
          if (sameTask(t, task)) {
            const nt = {
              ...t,
              active: false,
              newTask: false,
              completed: false,
              failed: false,
            };
            nt[status] = true;
            return nt;
          }
          return t;
        });
        return { ...u, tasks: nextTasks, taskCounts: recalcCounts(nextTasks) };
      }
      return u;
    });

    setUserData(updated);
    localStorage.setItem("employees", JSON.stringify(updated));

    // Keep loggedInUser in sync so reload reflects latest
    const current = updated.find((u) => u.id === data.id);
    const logged = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (logged && logged.role === "employee") {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "employee", data: current })
      );
    }
  };

  // Always render the freshest version of this user from context
  const me = userData.find((u) => u.id === data?.id) || data;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <Header changeUser={changeUser} data={me} />
      <TaskListNumbers data={me} />
      <TaskList data={me} onUpdateTask={handleUpdateTask} />
    </div>
  );
};

export default EmployeeDashboard;
