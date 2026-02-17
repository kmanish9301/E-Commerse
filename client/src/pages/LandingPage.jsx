import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Zap, Shield, Globe } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Fashion Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 animate-bounce">
            <span className="inline-block p-4 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] mb-4 backdrop-blur-sm">
              <ShoppingBag size={48} />
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent)] to-purple-600 animate-pulse">
            SHOP PREMIUM
          </h1>
          <p className="text-xl md:text-3xl font-light mb-10 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Experience the future of shopping. Curated collections for the
            modern lifestyle.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-10 py-5 text-xl font-bold text-white bg-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)] group"
          >
            Start Shopping
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-2xl bg-[var(--bg-primary)] shadow-lg hover:shadow-2xl transition-shadow border border-[var(--border)]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-[var(--text-secondary)]">
                Instant checkout and same-day delivery options available.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[var(--bg-primary)] shadow-lg hover:shadow-2xl transition-shadow border border-[var(--border)]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Shopping</h3>
              <p className="text-[var(--text-secondary)]">
                Your data is protected with state-of-the-art encryption.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[var(--bg-primary)] shadow-lg hover:shadow-2xl transition-shadow border border-[var(--border)]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Shipping</h3>
              <p className="text-[var(--text-secondary)]">
                We ship to over 200 countries worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
