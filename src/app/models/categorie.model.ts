import { Product } from './product.model';

export interface Categorie {
  id: number;
  nom: string;
  image: string;
  routerLink:string;
  products: Product[];
}
