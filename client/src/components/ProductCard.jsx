import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ImageLoader from "./common/ImageLoader";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="group relative bg-[var(--bg-primary)] rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent)]/10 flex flex-col h-full">
      {/* Image Container with Overlay */}
      <div className="relative h-64 overflow-hidden bg-white">
        <ImageLoader
          src={product?.image}
          alt={product?.title || "Product"}
          className="w-full h-full p-8 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
          <Link
            to={`/product/${product?.id}`}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-[var(--accent)] hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            title="View Details"
          >
            <Eye size={20} />
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(product);
            }}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-[var(--accent)] hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative">
        <div className="mb-2 flex items-start justify-between gap-2">
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] uppercase tracking-wider">
            {product?.category || "General"}
          </span>
          <div className="flex items-center text-yellow-400 text-xs font-bold gap-1">
            <Star size={12} fill="currentColor" />
            <span>{product?.rating?.rate || 0}</span>
          </div>
        </div>

        <Link
          to={`/product/${product?.id}`}
          className="text-base font-bold text-[var(--text-primary)] hover:text-[var(--accent)] line-clamp-2 mb-3 leading-tight transition-colors"
        >
          {product?.title || "Untitled Product"}
        </Link>

        <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <div>
            <span className="text-xs text-[var(--text-secondary)] block">
              Price
            </span>
            <span className="text-xl font-extrabold text-[var(--text-primary)]">
              ${product?.price?.toFixed(2) || "0.00"}
            </span>
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="text-sm font-semibold text-[var(--accent)] hover:underline decoration-2 underline-offset-4"
          >
            Add Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
