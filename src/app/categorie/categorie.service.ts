import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  baseUrl: string = environment.apiUrl;

  constructor(private httpcClient: HttpClient) {}

  getCategories(): Observable<Categorie[]> {
    return this.httpcClient.get<Categorie[]>(this.baseUrl + 'categories');
  }
  getCategoriesWithLimit(limit: number): Observable<Categorie[]> {
    return this.httpcClient.get<Categorie[]>(
      this.baseUrl + 'categories?limit=' + limit
    );
  }
}
