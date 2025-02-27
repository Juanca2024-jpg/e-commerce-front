import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCardDetails } from '@data/interfaces/product-details';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  createOrder(product:ProductCardDetails[]): Observable<any>{
    const fakeResponse = {
      results: 'se agrego correctamente la orden'
    };
    return of(fakeResponse).pipe();
  }

}
