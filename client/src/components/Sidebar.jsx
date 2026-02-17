import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Home, Box, Settings, X } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Box, label: "Products", path: "/products" }, // Products route
    { icon: Settings, label: "Settings", path: "/settings" }, // Placeholder
  ];

  const isActive = (path) => {
    // Simple match for now, could be improved
    if (!location?.pathname) return false;
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 bg-[var(--bg-secondary)] border-r border-[var(--border)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-[var(--bg-primary)] border-b border-[var(--border)]">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-[var(--accent)]" />
            <span className="text-xl font-bold text-[var(--text-primary)]">
              ShopPremium
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-[var(--text-secondary)]"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose} // Close on mobile navigation
                className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <item.icon
                  size={20}
                  className={`mr-3 ${active ? "text-white" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
