import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const Toast = ({ message, type = "info", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${bgColors[type]} z-50 animate-slide-in-right`}
    >
      {icons[type]}
      <p className="text-sm font-medium text-[var(--text-primary)]">
        {message}
      </p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
      >
        <X size={16} className="text-[var(--text-secondary)]" />
      </button>
    </div>
  );
};

export default Toast;
