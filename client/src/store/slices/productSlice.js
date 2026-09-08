import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/products', { params });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchProductBySlug = createAsyncThunk('products/fetchBySlug', async (slug, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Product not found');
  }
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/categories');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    product: null,
    reviews: [],
    relatedProducts: [],
    categories: [],
    pagination: null,
    loading: false,
    error: null
  },
  reducers: {
    clearProduct: (state) => { state.product = null; state.reviews = []; state.relatedProducts = []; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchProductBySlug.pending, (state) => { state.loading = true; })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.reviews = action.payload.reviews;
        state.relatedProducts = action.payload.related;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      });
  }
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
