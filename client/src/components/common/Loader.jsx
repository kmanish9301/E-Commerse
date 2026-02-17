import React from "react";

const Loader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-[var(--bg-card)] rounded-xl shadow-lg overflow-hidden border border-[var(--border)] animate-pulse"
        >
          <div className="h-64 bg-gray-300 dark:bg-gray-700 w-full" />
          <div className="p-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
