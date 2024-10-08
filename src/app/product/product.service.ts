import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  getProductById(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}products/${id}`);
  }
  getProductGalerieById(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}galerie/${id}`);
  }
}
