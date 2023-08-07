import { Categorie } from './categorie.model';
import { Fournisseur } from './fournisseur.model';
import { Marque } from './marque.model';
import { Tag } from './tag.model';

export interface Product {
  id: string;
  titre: string;
  description: string;
  prixFournisseur: number;
  prix: number;
  tauxPromo: number;
  quantiteStock: number;
  reference: string;
  image?: string;
  productsCategorie: Categorie[];
  marque: Marque[];
  tags: Tag[];
  fournisseur: Fournisseur;
}
