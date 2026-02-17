import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] p-4 text-center">
      <h1 className="text-9xl font-extrabold text-[var(--accent)] opacity-20">
        404
      </h1>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          Page Not Found
        </h2>
        <p className="text-[var(--text-secondary)] mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-full hover:bg-[var(--accent-hover)] transition-all shadow-lg hover:shadow-[var(--accent)]/30"
        >
          <Home size={20} />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
