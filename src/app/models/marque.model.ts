import { Product } from './product.model';

export interface Marque {
  id: number;

  nom: string;

  description: string;
  products: Product;
}
