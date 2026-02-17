import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  // closeCart, // we will pass onClose prop to be consistent or use dispatch
} from "../redux/cartSlice";
import Spinner from "./common/Spinner";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items: cart, loading } = useSelector((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ productId: id, quantity }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price || 0) * (item.quantity || 1);
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[var(--bg-primary)] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-[var(--accent)]" size={20} />
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Your Cart ({cartCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Spinner size={32} />
              </div>
            ) : cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag
                  size={48}
                  className="text-[var(--text-secondary)] mb-4 opacity-20"
                />
                <p className="text-[var(--text-secondary)]">
                  Your cart is empty
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 text-sm text-[var(--accent)] hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id} // Ensure item.id is unique product ID
                  className="flex gap-4 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] group"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-[var(--border)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[var(--border)] rounded-lg">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-2 text-sm text-[var(--text-primary)] font-medium min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-[var(--text-primary)]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[var(--text-secondary)]">Subtotal</span>
                <span className="text-xl font-bold text-[var(--text-primary)]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                <span>Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
