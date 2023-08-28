import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}
  getProductById(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}products/${id}`);
  }
  getProductGalerieById(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}galerie/${id}`);
  }
}
