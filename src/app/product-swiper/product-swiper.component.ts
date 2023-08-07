import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import { A11y, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-product-swiper',
  templateUrl: './product-swiper.component.html',
  styleUrls: ['./product-swiper.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductSwiperComponent {
  sliders: string[] = [
    'Test 1',
    'Test 2',
    'Test 3',
    'Test 4',
    'Test 5',
    'Test 6',
    'Test 7',
    'Test 8',
    'Test 9',
  ];
  public config: SwiperOptions = {
    observer: true,
    observeParents: true,
    parallax: true,
  };
}
