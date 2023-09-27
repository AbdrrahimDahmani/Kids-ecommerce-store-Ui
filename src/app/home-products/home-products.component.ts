import { Component, OnInit } from '@angular/core';
import { ProductSwiperService } from '../product-swiper/product-swiper.service';
import { Product } from '../models/product.model';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css'],
})
export class HomeProductsComponent implements OnInit {
  breakpoint = 5;
  homeProducts: Array<CategorieProducts> = [];
  categories: string[];

  constructor(private productSwiperService: ProductSwiperService) {
    this.categories = [
      'top-des-ventes',
      'biberons',
      'balancelles',
      'porte-bebe',
      'poussettes',
    ];
  }

  ngOnInit(): void {
    const categoryObservables = this.categories.map((cat: string) => {
      return this.productSwiperService.getProductByCategorie(cat, 10);
    });

    forkJoin(categoryObservables).subscribe({
      next: (productsArray) => {
        const combinedData = this.categories.map((cat, index) => ({
          categorie: cat,
          products: productsArray[index],
        }));

        this.homeProducts = combinedData.sort((a, b) => {
          return (
            this.categories.indexOf(a.categorie) -
            this.categories.indexOf(b.categorie)
          );
        });
        console.log(this.homeProducts);
      },
      error: (e) => console.log(e),
    });
  }
}
export type CategorieProducts = {
  categorie?: string;
  products?: any[];
};
