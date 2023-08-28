import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
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

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(OverlayMenuComponent, {
      width: '100vh',
      height: '100vh',
      maxWidth: '100vh',
      maxHeight: '100vh',
      hasBackdrop: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

export type NavCategory = {
  name: string;
  img: string;
  routerLink: string;
};
