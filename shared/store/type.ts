export interface Product {
  img?: string;
  title: string;
  id: string;
  price: number;
  desc?: string;
  categoryProductId: string;
}

export interface Rating {
  rate: number;
  count: number;
}
