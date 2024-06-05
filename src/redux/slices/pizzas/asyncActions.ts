import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TypeItem, TypeSearchPizzasParams } from './types';
import { endpoints } from '../../../api/endpoints';

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
