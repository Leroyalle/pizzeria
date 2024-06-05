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
