import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NavCategory } from '../navbar/navbar.component';

@Component({
  selector: 'app-overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.css'],
})
export class OverlayMenuComponent {
  navCategories: NavCategory[] = [
    {
      name: 'ACCUEIL',
      img: 'https://img.icons8.com/material-rounded/20/null/home-page.png',
      routerLink: '/',
    },
    {
      name: 'POUSSETTES',
      img: 'https://img.icons8.com/ios-glyphs/20/null/men-age-group-1.png',
      routerLink: '/categorie/poussettes',
    },
    {
      name: 'SIÉGE AUTO',
      img: 'https://img.icons8.com/ios-filled/20/null/baby-car-seat.png',
      routerLink: '/categorie/siege-auto',
    },
    {
      name: 'ALIMENTATION',
      img: 'https://img.icons8.com/sf-black-filled/20/null/baby-bottle.png',
      routerLink: '/categorie/alimentation',
    },
    {
      name: 'Hygiène',
      img: 'https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/20/null/external-diaper-baby-vitaliy-gorbachev-fill-vitaly-gorbachev.png',
      routerLink: '/categorie/hygiene',
    },
    {
      name: 'Maternité',
      img: "https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/20/null/external-Pregnant-mother's-day-smashingstocks-glyph-smashing-stocks.png",
      routerLink: '/categorie/maternite',
    },
    {
      name: 'LISTE DE NAISSANCE',
      img: 'https://img.icons8.com/ios-filled/20/null/gift--v1.png',
      routerLink: '/categorie/liste-de-naissance',
    },
  ];

  constructor(public dialogRef: MatDialogRef<OverlayMenuComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
