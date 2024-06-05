import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/slice';
import cart from './slices/cart/slice';
import pizzas from './slices/pizzas/slice';
import { useDispatch } from 'react-redux';
export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
