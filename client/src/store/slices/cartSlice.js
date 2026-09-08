import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/cart');
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk('cart/add', async (item, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/cart', item);
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
  }
});

export const updateCartItem = createAsyncThunk('cart/update', async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/cart/${itemId}`, { quantity });
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
  }
});

export const removeFromCart = createAsyncThunk('cart/remove', async (itemId, { rejectWithValue }) => {
  try {
    const { data } = await api.delete(`/cart/${itemId}`);
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    clearCart: (state) => { state.items = []; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.loading = false;
      })
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.loading = false;
      })
      .addCase(addToCart.pending, (state) => { state.loading = true; })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.loading = false;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.loading = false;
      });
  }
});

export default cartSlice.reducer;
