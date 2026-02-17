import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { Star, ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("loading", loading);

  // asdasdas
  // fdfsdfsdfs
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/get-product-details/${id}`);
        if (response.data && response.data.product_details) {
          setProduct(response.data.product_details);
        } else {
          console.warn("Unexpected API response structure:", response.data);
          setProduct(response.data); // Fallback
        }
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-[var(--accent)]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || "Product not found"}</p>
        <button
          onClick={() => navigate("/")}
          className="text-[var(--accent)] hover:underline"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-primary)] rounded-2xl shadow-xl overflow-hidden border border-[var(--border)]">
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative bg-white rounded-xl p-8 flex items-center justify-center border border-[var(--border)]">
            <img
              src={product?.image}
              alt={product?.title || "Product"}
              className="max-h-[500px] w-auto object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
              {product?.category || "Uncategorized"}
            </span>
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-4">
              {product?.title || "Untitled Product"}
            </h1>

            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={
                      i < Math.round(product?.rating?.rate || 0)
                        ? "currentColor"
                        : "none"
                    }
                    className={
                      i < Math.round(product?.rating?.rate || 0)
                        ? "text-yellow-400"
                        : "text-[var(--text-secondary)] opacity-30"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-[var(--text-secondary)] ml-3">
                {product?.rating?.count || 0} reviews
              </span>
            </div>

            <p className="text-4xl font-bold text-[var(--text-primary)] mb-8">
              ${product?.price || "0.00"}
            </p>

            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              {product?.description || "No description available."}
            </p>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="w-full md:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors shadow-lg"
            >
              <ShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
