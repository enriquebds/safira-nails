export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}
