import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import { A11y, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { ProductSwiperService } from './product-swiper.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-swiper',
  templateUrl: './product-swiper.component.html',
  styleUrls: ['./product-swiper.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductSwiperComponent implements OnInit {
  products: any[] = [];
  promoProducts: any[] = [];
  constructor(private productSwiperService: ProductSwiperService) {}

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: "<div class='nav-btn next-slide'></div>",
    prevArrow: "<div class='nav-btn prev-slide'></div>",
    dots: false,
    infinite: true,
    autoplay: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  ngOnInit(): void {
    // this.productSwiperService.getProductSwiper().subscribe(
    //   (success) => {
    //     this.products = success;
    //     this.products.map((product) => {
    //       product.productsCategorie.map((prod) => {
    //         this.productsCategories.push({
    //           productId: prod.productId,
    //           categorieId: prod.categorieId,
    //         });
    //       });
    //     });
    //     this.productsCategories.map((prodCat) => {
    //       this.productSwiperService
    //         .getProductCategories(prodCat.productId, prodCat.categorieId)
    //         .subscribe((res) => {
    //           console.log(res);
    //         });
    //     });
    //   },
    //   (errorResponse) => {
    //     console.log(errorResponse);
    //   }
    // );
    this.productSwiperService.getPromoProduct('Promo du jour').subscribe({
      next: (success) => {
        this.products = success;
        this.products.map((prod) => {
          this.promoProducts.push(prod.product);
        });
      },
      error: (e) => console.log(e),
    });
    console.log(this.promoProducts);
  }
}
