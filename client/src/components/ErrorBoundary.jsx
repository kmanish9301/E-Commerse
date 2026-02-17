import React from "react";
import { AlertTriangle } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] p-4">
          <div className="max-w-md w-full bg-[var(--bg-primary)] border border-red-200 dark:border-red-800 rounded-lg shadow-xl p-8 text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Something went wrong
            </h1>
            <p className="text-[var(--text-secondary)] mb-6">
              We're sorry, but the application encountered an unexpected error.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-8 text-left text-xs text-red-500 overflow-auto max-h-48 p-4 bg-gray-100 dark:bg-gray-900 rounded">
                <p className="font-mono">{this.state.error.toString()}</p>
                <br />
                <pre className="font-mono">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
