import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Loader2 } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/get-all-products");

        if (response.data && Array.isArray(response.data.results)) {
          setProducts(response.data.results);
        } else if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          // Fallback to empty array if no array found, preventing .map crash
          console.warn("Unexpected API response structure:", response.data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-[var(--accent)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 py-8">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-[var(--text-primary)] sm:text-5xl sm:tracking-tight lg:text-6xl">
          New Arrivals
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-[var(--text-secondary)]">
          Check out the latest trends in fashion and electronics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-[var(--text-secondary)] py-12">
          No products found.
        </div>
      )}
    </div>
  );
};

export default Home;
