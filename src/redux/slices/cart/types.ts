export type TypeCartItem = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

export interface ICartSliceState {
  totalPrice: number;
  items: TypeCartItem[];
}
