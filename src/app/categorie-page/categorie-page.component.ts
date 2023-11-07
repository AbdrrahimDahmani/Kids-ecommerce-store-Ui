import { Component, OnInit } from '@angular/core';
import { CategorieProductService } from './categorie-product.service';
import { ActivatedRoute, Route } from '@angular/router';
import { CategorieProducts } from '../home-products/home-products.component';

@Component({
  selector: 'app-categorie-page',
  templateUrl: './categorie-page.component.html',
  styleUrls: ['./categorie-page.component.css'],
})
export class CategoriePageComponent implements OnInit {
  categorie: string = '';
  filtredProducts: Array<any> = [];
  products: Array<any> = [];
  constructor(
    private categorieService: CategorieProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categorie = this.route.snapshot.paramMap.get('categorie') as string;
    this.categorieService.getProductByCategorie(this.categorie).subscribe({
      next: (res) => {
        this.filtredProducts = res;
        this.filtredProducts.map((prod) => {
          this.products.push(prod.product);
        });
      },
      error: (err) => console.log(err),
    });
  }
}
