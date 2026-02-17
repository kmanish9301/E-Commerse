import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Loader2 } from "lucide-react";

// Lazy load pages
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Settings = lazy(() => import("../pages/Settings"));
import PageLoader from "../components/common/PageLoader";
import PageNotFound from "../components/common/PageNotFound";

// Removed inline PageLoader

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        {/* Landing Page does NOT use MainLayout as per user request (render products inside dashboard only) */}
        {/* Wait, user said "Dont render products inside Dashboard component, render it products component only, Instead create a crazy landing page and show that" 
            This implies Landing Page might be standalone or inside MainLayout but different content. 
            Usually Landing Pages allow navigation. MainLayout has Sidebar/Header. 
            Let's check "render products inside Dashboard component, render it products component only" 
            --> I think they mean the "/" route should NOT show products list inside the dashboard directly. 
            It should show Landing Page. 
            And Products list should be at "/products".
            If functionality requirements say "Make menu... show selected cart icons at header", Header is useful.
            Let's wrap LandingPage in MainLayout? Or standalone? 
            "Crazy Landing Page" implies standalone marketing page often. 
            But if we want "Login" button etc, maybe Header is needed.
            However, user requirement "Dont render products inside Dashboard component" suggests separating things.
            Let's make LandingPage standalone for maximum "Crazy" effect, or maybe just with a custom Header. 
            For now, let's keep it simple: LandingPage at root, Products at /products.
            I'll use MainLayout for /products and /settings etc.
            LandingPage could be outside MainLayout to have full screen freedom.
        */}
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "products",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetails />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/settings",
    element: (
      <MainLayout>
        <Suspense fallback={<PageLoader />}>
          <Settings />
        </Suspense>
      </MainLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
