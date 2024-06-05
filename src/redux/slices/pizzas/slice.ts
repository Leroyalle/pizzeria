import axios from 'axios';
import { endpoints } from '../../../api/endpoints';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EnumStatus, IPizzaSliceState, TypeItem, TypeSearchPizzasParams } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: IPizzaSliceState = {
  items: [],
  status: EnumStatus.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,

  reducers: {
    setItems(state, action: PayloadAction<TypeItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state, actions) => {
        state.status = EnumStatus.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, actions) => {
        state.items = actions.payload;
        state.status = EnumStatus.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state, actions) => {
        state.status = EnumStatus.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
