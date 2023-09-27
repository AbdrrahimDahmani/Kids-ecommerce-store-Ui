import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface PeriodicElement {
  prix: string;
  produit: number;
  quantity: number;
  soustotal: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { produit: 1, prix: 'Hydrogen', quantity: 1.0079, soustotal: 'H' },
  { produit: 2, prix: 'Helium', quantity: 4.0026, soustotal: 'He' },
  { produit: 3, prix: 'Lithium', quantity: 6.941, soustotal: 'Li' },
  { produit: 4, prix: 'Beryllium', quantity: 9.0122, soustotal: 'Be' },
  { produit: 5, prix: 'Boron', quantity: 10.811, soustotal: 'B' },
  { produit: 6, prix: 'Carbon', quantity: 12.0107, soustotal: 'C' },
  { produit: 7, prix: 'Nitrogen', quantity: 14.0067, soustotal: 'N' },
  { produit: 8, prix: 'Oxygen', quantity: 15.9994, soustotal: 'O' },
  { produit: 9, prix: 'Fluorine', quantity: 18.9984, soustotal: 'F' },
  { produit: 10, prix: 'Neon', quantity: 20.1797, soustotal: 'Ne' },
];

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  /**
   *
   */
  constructor(private cookieService: CookieService) {}
  displayedColumns: string[] = ['produit', 'prix', 'quantity', 'soustotal'];
  dataSource = ELEMENT_DATA;
  panierData: any[] = [];
  ngOnInit(): void {
    this.panierData = JSON.parse(this.cookieService.get('panier'));
    console.log(this.panierData);
  }
}
