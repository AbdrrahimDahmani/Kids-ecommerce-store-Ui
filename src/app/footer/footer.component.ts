import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../categorie/categorie.service';
import { Categorie } from '../models/categorie.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  limit: number = 8;
  categories: Categorie[] = [];
  informations: any[] = [
    { nom: 'Liste de naissance', link: 'liste-de-naissance' },
    { nom: 'À Propos', link: 'a-propos' },
    { nom: 'Contact', link: 'contact' },
    { nom: 'CGV', link: 'CGV' },
    {
      nom: 'Politique de Confidentialité',
      link: 'politique-de-confidentialité',
    },
    { nom: 'Politique de Retour', link: 'politique-de-retour' },
  ];
  constructor(private categorieService: CategorieService) {}
  ngOnInit(): void {
    this.categorieService.getCategoriesWithLimit(this.limit).subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.log(err),
    });
  }
}
