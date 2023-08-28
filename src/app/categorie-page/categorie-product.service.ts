import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorieProductService {
  baseUrl: string = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}

  getCategorieProduct() {
    this.httpClient.get('categorieProduct');
  }
  getProductByCategorie(categorie: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + 'filter/' + categorie);
  }
}
