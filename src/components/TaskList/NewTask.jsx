import React from "react";

const NewTask = ({ data, onAccept }) => {
  return (
    <div className="group rounded-2xl overflow-hidden border border-slate-700/60 bg-[linear-gradient(135deg,#0f172a_0%,#0b1324_100%)] shadow-[0_10px_25px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_35px_-12px_rgba(0,0,0,0.7)] transition transform hover:-translate-y-0.5">
      <div className="h-1 bg-gradient-to-r from-sky-500 to-cyan-400" />
      <div className="p-5">
        <div className="text-lg font-semibold tracking-tight group-hover:text-sky-300 transition">
          {data.taskTitle}
        </div>
        <div className="text-[15px] text-slate-300 mt-1.5">{data.taskDescription}</div>
        {/* If you chose to hide dates on completed/failed only, keeping date here is fine */}
        <div className="text-xs text-slate-400 mt-2">
          Due: {data.taskDate} • {data.category}
        </div>
        <div className="mt-3">
          <button
            className="px-3.5 py-1.5 rounded-md bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-sm transition shadow-sm"
            onClick={onAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
