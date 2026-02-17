import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 px-6 bg-[var(--bg-primary)] border-t border-[var(--border)] text-center">
      <p className="text-sm text-[var(--text-secondary)]">
        &copy; {new Date().getFullYear()} ShopPremium. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
