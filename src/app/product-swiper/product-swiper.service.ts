import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductSwiperService {
  baseUrl: string = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}
  getProductByCategorie(categorie: string, limit: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.baseUrl + 'filter/' + categorie + '?limit=' + limit
    );
  }
  getProductCategories(
    productId: string,
    categorieId: number
  ): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.baseUrl + 'product-categorie/' + productId + '/' + categorieId
    );
  }
}
