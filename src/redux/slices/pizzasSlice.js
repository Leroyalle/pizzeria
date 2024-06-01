import axios from 'axios';
import { endpoints } from '../../api/endpoints';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { page, perPage, category, sortBy, search } = params;

  const { data } = await axios.get(
    `${endpoints.pizzas}?${page}&${perPage}&${category}&_sort=${sortBy}&${search}`,
  );
  return data.data;
});

const initialState = {
  items: [],
  status: 'loading', // loading, pending, rejected
};
const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state, actions) => {
        console.log('pending');
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, actions) => {
        state.items = actions.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state, actions) => {
        state.status = 'error';
        state.items = [];
      });
  },
});
export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
