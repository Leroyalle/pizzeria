import axios from 'axios';
import { endpoints } from '../../api/endpoints';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TypeSort } from './filterSlice';

export type TypeSearchPizzasParams = {
  page: string;
  perPage: string;
  category: string;
  sortBy: string;
  search: string;
};

type TypeItem = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  // !  types sizes
};

export enum EnumStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IPizzaSliceState {
  items: TypeItem[];
  status: EnumStatus;
}

const initialState: IPizzaSliceState = {
  items: [],
  status: EnumStatus.LOADING, // loading, pending, rejected
};

export const fetchPizzas = createAsyncThunk<TypeItem[], TypeSearchPizzasParams>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { page, perPage, category, sortBy, search } = params;

    const { data } = await axios.get(
      `${endpoints.pizzas}?${page}&${perPage}&${category}&_sort=${sortBy}&${search}`,
    );
    return data.data;
  },
);

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
        console.log('pending');
        state.status = EnumStatus.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, actions) => {
        state.items = actions.payload;
        console.log(state.items);
        state.status = EnumStatus.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state, actions) => {
        state.status = EnumStatus.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
