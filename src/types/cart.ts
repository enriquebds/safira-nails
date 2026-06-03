export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  stock: number;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}
