import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CouponService {
  baseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  getCouponByCode(code: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}coupon/${code}`);
  }
  deleteCoupon(code: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}coupon/${code}`);
  }
}
