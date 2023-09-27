import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { JsonPipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @ViewChild('slickComponent') slickModal: SlickCarouselComponent;
  paniers: any[] = [];
  currentSlideIndex = 0;
  slickCarouselConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  id: string;

  initialValue = 1;
  reactiveForm: FormGroup;

  product: any;
  galeries: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) {}

  inputForm = new FormGroup({
    fullName: new FormControl(
      this.cookie.get('nom')
        ? this.cookie.get('nom') + ' ' + this.cookie.get('prenom')
        : null,
      [Validators.required]
    ),
    phone: new FormControl(
      this.cookie.get('telephone') ? this.cookie.get('telephone') : null,
      [Validators.required]
    ),
    adress: new FormControl(
      this.cookie.get('adresse') ? this.cookie.get('adresse') : null,
      [Validators.required]
    ),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  submitRecord() {
    this.inputForm.controls.phone.addValidators(
      Validators.pattern('[6-9]\\d{9}')
    );
    console.log(this.inputForm.controls.phone.errors);
    let separatedName = this.inputForm.value.fullName.split(' ');
    let quantite = this.inputForm.value.quantity;
    this.paniers.push({
      product: this.id,
      quantite: quantite,
    });

    this.cookie.set('nom', separatedName[0]);
    this.cookie.set('prenom', separatedName[1]);
    this.cookie.set('telephone', this.inputForm.value.phone);
    this.cookie.set('adresse', this.inputForm.value.adress);
    this.cookie.set('panier', JSON.stringify(this.paniers));
    console.log(this.cookie.getAll());
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.id).subscribe({
      next: (res) => {
        this.product = res;
        this.product = Array.of(this.product);
        console.log(this.product);
      },
      error: (err) => console.log(err),
    });
    this.productService.getProductGalerieById(this.id).subscribe({
      next: (res) => {
        this.galeries = res;
      },
      error: (err) => console.log(err),
    });
  }

  showImage(index: number): void {
    console.log(index);
    this.slickModal.slickGoTo(index);
  }
}
