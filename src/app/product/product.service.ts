import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  getProductById(id: string) {
    return this.http.get(`${this.baseUrl}products/${id}`);
  }
  getProductGalerieById(id: string) {
    return this.http.get(`${this.baseUrl}galerie/${id}`);
  }
}
