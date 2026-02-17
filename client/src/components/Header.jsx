import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openCart, closeCart, fetchCart } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  Menu,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
  Check,
  ShoppingBag,
} from "lucide-react";
import Search from "./common/Search";
import CartSidebar from "./CartSidebar";

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const dispatch = useDispatch();
  const { items: cart, isCartOpen } = useSelector((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  const handleOpenCart = () => dispatch(openCart());
  const handleCloseCart = () => dispatch(closeCart());
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Search State
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  // Sync searchTerm with URL params when URL changes (e.g. back/forward navigation)
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (searchTerm !== currentSearch) {
      setSearchTerm(currentSearch);
    }
  }, [searchParams]);

  // Debounce updating URL when searchTerm changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchParams((prev) => {
        const currentUrlSearch = prev.get("search") || "";
        if (searchTerm === currentUrlSearch) return prev; // No change

        if (searchTerm) {
          prev.set("search", searchTerm);
        } else {
          prev.delete("search");
        }
        prev.set("page", "1"); // Reset to page 1 on search
        return prev;
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, setSearchParams]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const themeOrder = [
    { name: "light", icon: <Sun size={18} />, label: "Light" },
    { name: "dark", icon: <Moon size={18} />, label: "Dark" },
    {
      name: "midnight",
      icon: <Moon size={18} className="text-blue-400" />,
      label: "Midnight",
    },
    {
      name: "oled",
      icon: <Moon size={18} className="text-purple-400" />,
      label: "OLED",
    },
    {
      name: "soft",
      icon: <Sun size={18} className="text-yellow-400" />,
      label: "Soft",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="h-16 px-6 flex items-center justify-between bg-[var(--bg-primary)] border-b border-[var(--border)] sticky top-0 z-20 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
          >
            <Menu size={24} />
          </button>

          {/* Search Bar - Visual Only - Show only on Products page */}
          {location.pathname === "/products" && (
            <div className="hidden md:block w-64 md:w-96">
              <Search
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Trigger */}
          <button
            onClick={handleOpenCart}
            className="relative p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
            title="View Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              onBlur={() => setTimeout(() => setIsThemeOpen(false), 200)}
              className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors flex items-center gap-2"
              title="Select Theme"
            >
              {theme === "light" || theme === "soft" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
              <ChevronDown size={14} />
            </button>

            {isThemeOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-primary)] rounded-lg shadow-xl border border-[var(--border)] py-1 z-50 animate-fade-in">
                <div className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Select Theme
                </div>
                {themeOrder.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setTheme(t.name);
                      setIsThemeOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[var(--bg-secondary)] transition-colors ${
                      theme === t.name
                        ? "text-[var(--accent)] font-medium"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {t.icon}
                      <span>{t.label}</span>
                    </div>
                    {theme === t.name && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative pl-4 border-l border-[var(--border)]">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold ring-2 ring-transparent group-hover:ring-[var(--accent)]/30 transition-all">
                {user?.user_name?.charAt(0).toUpperCase() || <User size={16} />}
              </div>
              <span className="hidden md:block text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {user?.user_name || "Guest"}
              </span>
              <ChevronDown size={14} className="text-[var(--text-secondary)]" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-primary)] rounded-lg shadow-xl border border-[var(--border)] py-1 z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-[var(--border)]">
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {user?.user_name || "Guest User"}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">
                    {user?.email || "No email"}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
    </>
  );
};

export default Header;
