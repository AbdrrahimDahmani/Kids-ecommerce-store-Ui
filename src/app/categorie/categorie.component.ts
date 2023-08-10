import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { CategorieService } from './categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategorieComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private categorieService: CategorieService) {}
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: "<div class='nav-btn next-slide'></div>",
    prevArrow: "<div class='nav-btn prev-slide'></div>",
    dots: false,
    infinite: true,
    autoplay: true,
    adaptiveHeight: true,
    adaptiveWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log(this.categories.length);
        this.categories = this.categories.filter((categorie) => {
          return (
            categorie.nom !== 'Uncategorized' &&
            categorie.nom !== 'Promo du jour'
          );
        });
        console.log(this.categories.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
