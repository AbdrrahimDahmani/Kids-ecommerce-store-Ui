import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PanierService } from '../panier/panier.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  couponData: any = [];
  couponActive: boolean = false;
  panierData: any[] = [];
  panierSize: number = 0;
  prixTotal: number = 0;
  prixTotalAvecExpidition: number = 0;
  inputForm = new FormGroup({
    nom: new FormControl(
      localStorage.getItem('nom') ? localStorage.getItem('nom') : null,
      [Validators.required]
    ),
    prenom: new FormControl(
      localStorage.getItem('prenom') ? localStorage.getItem('prenom') : null,
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
    vile: new FormControl(
      localStorage.getItem('vile') ? localStorage.getItem('vile') : null,
      [Validators.required]
    ),
    note: new FormControl(
      localStorage.getItem('note') ? localStorage.getItem('note') : null,
      [Validators.required]
    ),
  });
  promoInput = new FormGroup({
    code: new FormControl(''),
  });
  adresse: string = '';
  constructor(private panierService: PanierService) {}
  ngOnInit(): void {
    this.panierData = this.panierService.getCartItems();
    this.panierSize = this.panierData.length;
    this.prixTotal = this.panierService.calcTotalPrice();
    this.adresse = localStorage.getItem('adresse') as string;
    if (this.prixTotal > 400) {
      this.prixTotalAvecExpidition = this.prixTotal;
    }
  }

  ngAfterViewInit(): void {
    if (this.panierSize > 0 && this.prixTotal < 400) {
      this.getFirstRadio();
    }
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
}
