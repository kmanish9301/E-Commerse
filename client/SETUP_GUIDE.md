# Client Setup & Commands Guide

This document details the step-by-step commands and configurations used to build the React client application.

## 1. Project Initialization

We started by creating a new Vite project with the React template.

```bash
# Initialize Vite project named 'client'
npx -y create-vite@latest client --template react

# Navigate into the project directory
cd client
```

## 2. Dependency Installation

We installed the core dependencies for routing, styling, icons, and API communication.

```bash
# Install production dependencies
npm install axios react-router-dom lucide-react clsx tailwind-merge

# Install Tailwind CSS and its Vite plugin
npm install tailwindcss @tailwindcss/vite
```

### Package Breakdown:

- **`axios`**: For making HTTP requests to the backend.
- **`react-router-dom`**: For handling client-side routing.
- **`lucide-react`**: For icons (e.g., ShoppingCart, User, Sun/Moon).
- **`clsx` & `tailwind-merge`**: Utilities for conditionally merging Tailwind classes.
- **`tailwindcss` & `@tailwindcss/vite`**: For utility-first styling.

## 3. Tailwind CSS Configuration

We configured Tailwind CSS v4 using the Vite plugin approach.

### Updated `vite.config.js`

Added the `@tailwindcss/vite` plugin to the configuration.

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Updated `src/index.css`

Replaced default styles with the Tailwind import.

```css
@import "tailwindcss";
```

## 4. Project Structure Setup

We created the necessary directory structure for a scalable application.

```bash
mkdir -p src/services src/context src/components src/pages src/layouts
```

- **`services/`**: API configuration (`api.js`).
- **`context/`**: Global state providers (`AuthContext`, `ThemeContext`).
- **`components/`**: Reusable UI elements (`Navbar`, `ProductCard`).
- **`pages/`**: View components (`Home`, `Login`, `Register`, `ProductDetails`).
- **`layouts/`**: Layout wrappers (`MainLayout`).
- **`components/`**: Reusable UI elements (`Sidebar`, `Header`, `Footer`, `ProductCard`).

## 5. Advanced Features Implementation

### Multi-Theme System

We implemented a 5-theme system using CSS variables in `src/index.css` and a `data-theme` attribute on the `<html>` tag managed by `ThemeContext`.

**Themes:**

1.  Light (Default)
2.  Soft (Warm/Beige)
3.  Dark (Default)
4.  Midnight (Blue-ish Dark)
5.  OLED (Pure Black)

```css
/* Example CSS Variable Definition */
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
  /* ... */
}
[data-theme="dark"] {
  --bg-primary: #111827;
  --text-primary: #f9fafb;
}
```

### Dashboard Layout

We refactored `MainLayout` to include a responsive sidebar and header.

- **Sidebar**: Collapsible drawer on mobile, fixed on desktop.
- **Header**: Contains Theme Selector, Search, and User Profile.

## 5. Running the Project

Commands to start the development environment or build for production.

```bash
# Start Development Server
npm run dev

# Build for Production
npm run build

# Preview Production Build
npm run preview
```
