import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { EnumSortProperty, IFilterSliceState, TypeSort } from './types';

const initialState: IFilterSliceState = {
  searchValue: '',
  activeCategory: 0,
  currentPage: 1,
  sort: {
    name: 'популярности ↓',
    sortProperty: EnumSortProperty.RATING_DESC,
  },
};
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setSort(state, action: PayloadAction<TypeSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.activeCategory = Number(action.payload.activeCategory);
      state.sort = action.payload.sort;
    },
  },
});

export const { setSearchValue, setActiveCategory, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
