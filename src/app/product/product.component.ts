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
import { CartItem, PanierService } from '../panier/panier.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @ViewChild('slickComponent') slickModal!: SlickCarouselComponent;
  panier: CartItem;
  currentSlideIndex = 0;
  slickCarouselConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  id: string = '';
  tauxPromo: number = 0;
  titre: string = '';
  image: string = '';
  prix: number = 0;

  initialValue = 1;
  // reactiveForm: FormGroup;

  product: any;
  galeries: any[] = [];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private panierService: PanierService,
    private notifierService: NotifierService
  ) {
    this.panier = {
      id: '',
      title: '',
      image: '',
      price: 0,
      quantity: 0,
    };
  }

  inputForm = new FormGroup({
    fullName: new FormControl(
      localStorage.getItem('nom')
        ? localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom')
        : null,
      [Validators.required]
    ),
    phone: new FormControl(
      localStorage.getItem('telephone')
        ? localStorage.getItem('telephone')
        : null,
      [Validators.required]
    ),
    adress: new FormControl(
      localStorage.getItem('adresse') ? localStorage.getItem('adresse') : null,
      [Validators.required]
    ),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  submitRecord() {
    this.inputForm.controls.phone.addValidators(
      Validators.pattern('[6-9]\\d{9}')
    );

    let separatedName = this.inputForm.value.fullName?.split(' ');
    let quantite = this.inputForm.value.quantity;
    if (quantite) {
      if (this.panierService.findCartById(this.id)) {
        this.panierService.updateCartItemQuantity(this.id, quantite);
        this.panierService.addToCart(this.panier);
      } else if (this.product.tauxPromo) {
        let promoPrice =
          this.product.prix -
          (this.product[0].prix * this.product[0].tauxPromo) / 100;
        this.panier = {
          id: this.id,
          title: this.product[0].titre,
          price: promoPrice,
          image: this.product[0].image,
          quantity: quantite,
        };
        this.panierService.addToCart(this.panier);
      } else {
        this.panier = {
          id: this.id,
          title: this.product[0].titre,
          price: this.product[0].prix,
          image: this.product[0].image,
          quantity: quantite,
        };
        this.panierService.addToCart(this.panier);
      }
    }

    if (
      separatedName &&
      this.inputForm.value.phone &&
      this.inputForm.value.adress
    ) {
      //user info
      localStorage.setItem('nom', separatedName[0]);
      localStorage.setItem('prenom', separatedName[1]);

      localStorage.setItem('telephone', this.inputForm.value.phone);
      localStorage.setItem('adresse', this.inputForm.value.adress);
    }

    //handle notification service
    this.notifierService.notify(
      'success',
      'Produit ajouté au panier avec succès !'
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    this.productService.getProductById(this.id).subscribe({
      next: (res) => {
        this.product = res;
        this.product = Array.of(this.product);
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
    this.slickModal.slickGoTo(index);
  }
}
