import { ProductTag } from './product-tag.model';

export interface Tag {
  id: number;
  nom: string;
  tags: ProductTag[];
}
