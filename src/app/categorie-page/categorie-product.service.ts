import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategorieProductService {
  baseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getCategorieProduct() {
    this.httpClient.get('categorieProduct');
  }
  getProductByCategorie(categorie: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + 'filter/' + categorie);
  }
}
