import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  baseUrl: string = 'http://localhost:3000/';

  constructor(private httpcClient: HttpClient) {}

  getCategories(): Observable<Categorie[]> {
    return this.httpcClient.get<Categorie[]>(this.baseUrl + 'categories');
  }
}
