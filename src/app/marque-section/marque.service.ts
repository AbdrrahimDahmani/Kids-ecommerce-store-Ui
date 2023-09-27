import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marque } from './../models/marque.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MarqueService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getMarques(limit: number): Observable<Marque[]> {
    return this.http.get<Marque[]>(this.baseUrl + 'marque?limit=' + limit);
  }
}
