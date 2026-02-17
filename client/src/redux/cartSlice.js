import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Async Thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/get-user-carts");
      if (response.data?.success && Array.isArray(response.data.data)) {
        // Normalize: flatten the structure so 'product' details are at top level
        return response.data.data.map((item) => {
          const productData = item.product || {};
          return {
            ...productData,
            quantity: item.quantity,
            id: productData.id, // Ensure product ID is top level
          };
        });
      }
      return [];
    } catch (error) {
      if (error.response?.status === 401) {
          // User not authenticated, return empty cart
          return [];
      }
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/add-to-cart", {
        productId: product.id,
        quantity: 1,
      });

      if (response.data?.success) {
        dispatch(fetchCart());
        return response.data;
      }
      return rejectWithValue("Failed to add to cart");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
    if (quantity < 1) return;
    try {
      const response = await api.put("/update-user-carts", {
        productId,
        quantity,
      });

      if (response.data?.success) {
         // We could just return the payload to update state locally for optimization,
         // but consistent with current logic, let's re-fetch or just update local state.
         // Given the complexity of syncing, re-fetching is safer effectively,
         // but local update produces better UX.
         // Let's return the payload to update local state in fulfilled.
         return { productId, quantity };
      }
       // If fail, we might want to revert.
      return rejectWithValue("Failed to update quantity");
    } catch (error) {
      // Revert in component or handle error
      dispatch(fetchCart()); // Re-sync on error
      return rejectWithValue(error.response?.data?.message || "Failed to update quantity");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/delete-user-carts/${productId}`);
      if (response.data?.success) {
        return productId;
      }
      return rejectWithValue("Failed to remove from cart");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove from cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    isCartOpen: false,
    error: null,
  },
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state) => {
        state.isCartOpen = true; // Auto open sidebar
      })
      // Update Quantity
      .addCase(updateQuantity.pending, (state, action) => {
          // Optimistic update
          const { productId, quantity } = action.meta.arg;
          const item = state.items.find(item => item.id === productId);
          if (item) {
              item.quantity = quantity;
          }
      })
      .addCase(updateQuantity.rejected, (state) => {
           // If it fails, we might need to revert.
           // However, since we dispatch fetchCart on error in thunk (shimmed),
           // the state will eventually correct itself when fetchCart fulfills.
      })
      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { openCart, closeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
