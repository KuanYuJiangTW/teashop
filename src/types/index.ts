export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // in TWD cents
  image: string;
  description: string;
  stock: number; // units available
  weight: number; // in grams
};


