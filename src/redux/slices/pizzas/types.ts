export type TypeSearchPizzasParams = {
  page: string;
  perPage: string;
  category: string;
  sortBy: string;
  search: string;
};

export type TypeItem = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
};

export enum EnumStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSliceState {
  items: TypeItem[];
  status: EnumStatus;
}
