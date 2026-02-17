import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import PageLoader from "../components/common/PageLoader";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // Params from URL
  const page = parseInt(searchParams.get("page") || "1", 10);
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const limit = 8; // Items per page

  // Static categories for now (since we moved to server-side pagination)
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Build query params
        const params = {
          page,
          limit,
        };
        if (category && category !== "all") params.category = category;
        if (search) params.search = search;

        const response = await api.get("/get-all-products", { params });

        if (response.data?.success) {
          setProducts(response.data.results || []);
          setTotalPages(response.data.totalPages || 1);
          setTotalItems(response.data.count || 0);
        } else {
          // Fallback or empty
          setProducts([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, category, search]);

  const handleCategoryChange = (newCategory) => {
    setSearchParams((prev) => {
      if (newCategory === "all") {
        prev.delete("category");
      } else {
        prev.set("category", newCategory);
      }
      prev.set("page", "1"); // Reset to page 1
      return prev;
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-[var(--text-primary)] sm:text-5xl tracking-tight mb-4">
          Discover Our Collection
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Explore the latest trends in fashion, electronics, and more.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border)] shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-4 text-[var(--text-primary)] font-bold">
              <Filter size={20} />
              <span>Filters</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                Category
              </h3>
              <button
                onClick={() => handleCategoryChange("all")}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  !category || category === "all"
                    ? "bg-[var(--accent)] text-white font-medium"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    category === cat
                      ? "bg-[var(--accent)] text-white font-medium"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid & Loader & Pagination */}
        <div className="flex-1">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <PageLoader />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-[var(--bg-primary)] rounded-xl border border-[var(--border)]">
              <p className="text-lg text-[var(--text-secondary)]">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => setSearchParams({})}
                className="mt-4 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded-full border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <span className="text-[var(--text-secondary)] font-medium">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded-full border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
