import { Component, OnInit } from '@angular/core';
import { MarqueService } from './marque.service';
import { Marque } from '../models/marque.model';

@Component({
  selector: 'app-marque-section',
  templateUrl: './marque-section.component.html',
  styleUrls: ['./marque-section.component.css'],
})
export class MarqueSectionComponent implements OnInit {
  marques: Marque[] = [];
  limit: number = 12;
  constructor(private marqueService: MarqueService) {}

  ngOnInit(): void {
    this.marqueService.getMarques(this.limit).subscribe({
      next: (res) => (this.marques = res),
      error: (err) => console.log(err),
    });
  }
}
