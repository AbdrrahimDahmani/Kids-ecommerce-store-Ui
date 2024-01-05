import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PanierService } from './panier.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { CouponService } from './coupon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit, AfterViewInit {
  inputForm = new FormGroup({
    quantity: new FormControl([Validators.required, Validators.min(1)]),
  });
  initialValue: number = 2;

  couponData: any = [];
  couponActive: boolean = false;
  panierData: any[] = [];
  panierSize: number = 0;
  prixTotal: number = 0;
  prixTotalAvecExpidition: number = 0;
  adresse: string = '';
  panierVide: boolean = false;
  promoInput = new FormGroup({
    code: new FormControl(''),
  });
  constructor(
    private panierService: PanierService,
    private notifierService: NotifierService,
    private couponService: CouponService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (!this.panierVide && this.prixTotal < 400) {
      this.getFirstRadio();
    }
  }
  ngOnInit(): void {
    this.panierData = this.panierService.getCartItems().filter((n: any) => n);
    this.panierSize = this.panierData.length;
    this.panierVide = this.changePanierVideStatus(this.panierSize);
    if (!this.panierVide) {
      this.adresse = localStorage.getItem('adresse') as string;
      const productQuantityMap = new Map<any, any>();
      for (const cartItem of this.panierData) {
        productQuantityMap.set(cartItem.id, cartItem.quantity);
      }

      // Set the initial value of the quantity input for each product
      for (const product of this.panierData) {
        this.inputForm.controls.quantity.setValue(
          productQuantityMap.get(product.id),
          { emitEvent: false }
        );
      }
      this.prixTotal = this.panierService.calcTotalPrice();
    }
  }

  updateCartItemQuantity(id: string, event: any) {
    const element = event.currentTarget as HTMLInputElement;
    const quantity = Number(element.value);
    this.panierService.updateCartItemQuantity(id, quantity);
    this.panierData.find((item) => item.id === id).quantity = quantity;
    this.prixTotal = this.panierService.calcTotalPrice();
    this.getFirstRadio();
    this.notifierService.notify('success', 'Votre panier a été mis à jour !');
  }
  deleteProductFromCart(id: string) {
    this.panierService.removeFromCart(id);

    // Remove the product from the panierData array
    this.panierData = this.panierData.filter((item) => item.id !== id);
    this.prixTotal = this.panierService.calcTotalPrice();
    this.getFirstRadio();
    this.panierSize = this.panierData.length;
    this.notifierService.notify(
      'error',
      'Ce produit a été retiré de votre panier !'
    );
    this.panierVide = this.changePanierVideStatus(this.panierSize);
  }
  deleteAllProductsFromCart() {
    this.panierService.removeAll();
    this.panierData = [];
    this.prixTotal = this.panierService.calcTotalPrice();
    this.getFirstRadio();
    this.panierSize = this.panierData.length;
    this.notifierService.notify('error', 'Votre panier est vide !');
    this.panierVide = this.changePanierVideStatus(this.panierSize);
  }

  onChangeRadio(event: any) {
    if (this.couponActive) {
      const couponDiscount =
        this.prixTotal -
        this.panierService.calcTotalPriceWithCoupon(
          this.couponData.type,
          this.couponData.value
        );

      this.prixTotalAvecExpidition =
        this.panierService.calcTotalPrice() -
        couponDiscount +
        Number(event.target.value);
    } else {
      this.prixTotalAvecExpidition =
        this.panierService.calcTotalPrice() + Number(event.target.value);
    }
  }
  onLoadRadio(element: HTMLInputElement) {
    if (this.couponActive) {
      const couponDiscount =
        this.prixTotal -
        this.panierService.calcTotalPriceWithCoupon(
          this.couponData.type,
          this.couponData.value
        );
      this.prixTotalAvecExpidition =
        this.panierService.calcTotalPrice() -
        couponDiscount +
        Number(element.value);
    } else {
      this.prixTotalAvecExpidition =
        this.panierService.calcTotalPrice() + Number(element.value);
    }
  }

  getFirstRadio() {
    const radioButton = document.querySelector(
      'input[type="radio"]:first-child'
    ) as HTMLInputElement;
    this.onLoadRadio(radioButton);
  }
  changePanierVideStatus(panierSize: number): boolean {
    if (panierSize < 1) {
      return true;
    }
    return false;
  }
  validateCouponCode() {
    const radioButton = document.querySelector(
      'input[type="radio"]:first-child'
    ) as HTMLInputElement;
    this.couponService
      .getCouponByCode(this.promoInput.value.code as string)
      .subscribe({
        next: (data) => {
          this.couponData = data;

          this.couponActive = this.couponData.active;
          const couponButton = document.querySelector(
            '.couponBtn'
          ) as HTMLInputElement;
          const couponInput = document.querySelector(
            '.couponInput'
          ) as HTMLInputElement;
          if (this.couponActive) {
            couponButton.disabled = true;
            couponInput.disabled = true;
            console.log(this.couponData);
            // Update the total price with the coupon discount
            this.prixTotalAvecExpidition =
              this.panierService.calcTotalPriceWithCoupon(
                this.couponData.type,
                this.couponData.value
              );
            this.onLoadRadio(radioButton);
            this.notifierService.notify('success', 'Coupon activé avec succés');
          }
        },
        error: (error) => {
          console.log(error);
          this.couponActive = false;
          this.notifierService.notify('error', 'Coupon non valide');
        },
      });
  }
  validePanier() {
    if (this.panierSize > 0) {
      const cartItems = this.panierService.getCartItems();
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      if (this.prixTotal < 400) {
        const expeditionType = document.querySelector(
          'input[type="radio"]:checked'
        ) as HTMLInputElement;
        const selectedExpeditionType = expeditionType.value;
        localStorage.setItem('selectedExpeditionType', selectedExpeditionType);
      }

      if (this.couponActive) {
        localStorage.setItem('couponActive', String(this.couponActive));
        localStorage.setItem('couponData', JSON.stringify(this.couponData));
      }
      this.router.navigate(['/checkout']);
    }
  }
}
