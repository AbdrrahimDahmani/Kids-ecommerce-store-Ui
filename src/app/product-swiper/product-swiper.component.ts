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
  animations: [],
})
export class ProductSwiperComponent implements OnInit {
  products: any[] = [];
  promoProducts: any[] = [];
  constructor(private productSwiperService: ProductSwiperService) {}

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow:
      "<div class='nav-btn next-slide'><img src='(../../assets/images/arrow.png' alt='arrow' class='hover-image next-img'/></div>",
    prevArrow:
      "<div class='nav-btn prev-slide'><img src='(../../assets/images/arrow.png' alt='arrow' class='hover-image prev-img'/></div>",
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
    this.productSwiperService
      .getProductByCategorie('promo-du-jour', 10)
      .subscribe({
        next: (success) => {
          this.products = success;
          this.products.map((prod) => {
            this.promoProducts.push(prod.product);
          });
        },
        error: (e) => console.log(e),
      });
  }

  // timer: any;

  // scrollDiv(elementToScroll: HTMLElement, depl: any) {
  //   elementToScroll.scrollLeft -= depl;
  //   console.log('scrolling...');
  //   this.timer = setTimeout(() => {
  //     this.scrollDiv(elementToScroll, depl);
  //   }, 30);
  // }

  // stopTimer(timer: number) {
  //   clearTimeout(timer);
  // }
}
