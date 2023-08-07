import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategorieComponent {
  categories: any[] = [1, 1, 2, 2, 5, 5, 1, 1, 2, 2, 5, 5];
}
