import React from "react";

const CompleteTask = ({ data, onArchive }) => {
  return (
    <div className="group rounded-2xl overflow-hidden border border-emerald-800/60 bg-[linear-gradient(135deg,#052e2b_0%,#071f1d_100%)] shadow-[0_10px_25px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_35px_-12px_rgba(0,0,0,0.7)] transition">
      <div className="p-5">
        <div className="text-lg font-semibold line-through text-emerald-200">
          {data.taskTitle}
        </div>
        <div className="text-[15px] text-emerald-200/80 line-through mt-1.5">
          {data.taskDescription}
        </div>
        <div className="mt-4">
          <button
            className="px-3.5 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-sm transition"
            onClick={onArchive}
          >
            Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteTask;
