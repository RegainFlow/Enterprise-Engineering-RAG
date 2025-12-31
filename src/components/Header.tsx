import React from 'react';
import { NavLink } from 'react-router-dom';
import { PiHexagonDuotone, PiBellDuotone, PiUserCircleDuotone } from "react-icons/pi";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-bg-primary/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-primary animate-pulse">
            <PiHexagonDuotone size={32} />
          </div>
          <h1 className="font-logo font-bold text-xl tracking-wide text-white">
            3D PRINT<span className="text-primary">INSIGHT</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <NavLink
            to="/discover"
            className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary transition-colors"}
          >
            Discover
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary transition-colors"}
          >
            Analytics
          </NavLink>
          <NavLink
            to="/knowledge-graph"
            className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary transition-colors"}
          >
            Knowledge Graph
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-text-secondary hover:text-white transition-colors">
            <PiBellDuotone size={24} />
          </button>
          <div className="flex items-center gap-2 pl-4 border-l border-white/10">
            <span className="text-right hidden sm:block">
              <div className="text-xs text-text-secondary">Logged in as</div>
              <div className="text-sm font-semibold text-white">Print Admin</div>
            </span>
            <PiUserCircleDuotone size={36} className="text-primary/80" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
