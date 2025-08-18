import React from "react";

const ProgressBar = () => (
  <div className="mt-3 h-1.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
    <div className="h-full w-2/3 bg-gradient-to-r from-amber-400 to-yellow-300 animate-[pulse_1.6s_ease-in-out_infinite]" />
  </div>
);

const AcceptTask = ({ data, onComplete, onFail }) => {
  return (
    <div className="group rounded-2xl overflow-hidden border border-slate-700/60 bg-[linear-gradient(135deg,#0f172a_0%,#0b1324_100%)] shadow-[0_10px_25px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_35px_-12px_rgba(0,0,0,0.7)] transition transform hover:-translate-y-0.5">
      <div className="h-1 bg-gradient-to-r from-amber-400 to-yellow-300" />
      <div className="p-5">
        <div className="text-lg font-semibold tracking-tight group-hover:text-amber-300 transition">
          {data.taskTitle}
        </div>
        <div className="text-[15px] text-slate-300 mt-1.5">{data.taskDescription}</div>
        <div className="text-xs text-slate-400 mt-2">
          Active • {data.taskDate} • {data.category}
        </div>

        <ProgressBar />

        <div className="mt-4 flex gap-2">
          <button
            className="px-3.5 py-1.5 rounded-md bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-sm transition shadow-sm"
            onClick={onComplete}
          >
            Mark Complete
          </button>
          <button
            className="px-3.5 py-1.5 rounded-md bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-sm transition shadow-sm"
            onClick={onFail}
          >
            Mark Failed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptTask;
