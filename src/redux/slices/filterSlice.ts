import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum EnumSortProperty {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type TypeSort = {
  name: string;
  sortProperty: EnumSortProperty;
};

export interface IFilterSliceState {
  searchValue: string;
  activeCategory: number;
  currentPage: number;
  sort: TypeSort;
}

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

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setSearchValue, setActiveCategory, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
