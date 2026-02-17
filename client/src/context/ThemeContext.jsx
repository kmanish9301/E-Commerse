import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "oled");

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove old class-based dark mode if present (cleanup)
    root.classList.remove("light", "dark");

    // Set data-theme attribute for CSS variables
    root.setAttribute("data-theme", theme);

    // Also set class for Tailwind's 'dark:' variant usage if the theme is dark-based
    const isDark = ["dark", "midnight", "oled"].includes(theme);
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
