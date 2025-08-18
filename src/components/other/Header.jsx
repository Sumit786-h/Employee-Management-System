import React from "react";

const Header = ({ changeUser, data }) => {
  const name = data?.firstName || "Admin";

  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");
    changeUser("");
  };

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, <span className="text-sky-400">{name}</span>
            </h1>
            {data?.email && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800/70 text-slate-300">
                {data.email}
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mt-1">Here’s an overview of today’s tasks.</p>
        </div>
        <button
          className="px-4 py-2 rounded-md text-sm bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 transition shadow-sm"
          onClick={logOutUser}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
