import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[var(--bg-secondary)] overflow-hidden transition-colors duration-300">
      {/* Sidebar - fixed on desktop, drawer on mobile */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[var(--bg-secondary)]">
          {children || <Outlet />}
        </main>

        {/* Footer could be inside main or stick at bottom if content short */}
        {/* Let's put it outside main if we want sticky, or inside if we want it after content */}
        {/* Since we have flex-1 on main, putting footer after it inside the flex col makes it always visible if content is short, 
             or pushed down if long. But main has overflow-y-auto, so footer would be fixed at bottom of viewport if outside main.
             Usually dashboard footers scroll with content. Let's put it inside main or make main flex col.
         */}
        {/* Option A: Fixed at bottom of viewport? No, bad for mobile. */}
        {/* Option B: After content. */}
      </div>
    </div>
  );
};

export default MainLayout;
