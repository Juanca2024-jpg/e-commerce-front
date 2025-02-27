import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductCardDetails } from '@data/interfaces/product-details';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor() { }
  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable();

  productsAll: ProductCardDetails[] = [
            {
              id: 1,
              name: "Mancuernas Ajustables",
              price: 492.800,
              description: "Set de mancuernas con pesos ajustables de 2kg a 20kg.",
              count: 10
            },
            {
              id: 2,
              name: "Banda de Resistencia",
              price: 63.141,
              description: "Banda de resistencia de alta calidad para entrenamiento de fuerza.",
              count: 25
            },
            {
              id: 3,
              name: "Colchoneta de Yoga",
              price: 122.207,
              description: "Colchoneta antideslizante ideal para yoga y ejercicios en casa.",
              count: 0
            },
            {
              id: 4,
              name: "Proteína en Polvo",
              price: 186.310,
              description: "Suplemento de proteína de suero sabor chocolate 1kg.",
              count: 20
            },
            {
              id: 5,
              name: "Rueda Abdominal",
              price: 93.654,
              description: "Rueda para ejercicios de core y abdominales con agarre ergonómico.",
              count: 30
            }
          ];
          productsSold: ProductCardDetails[] = [
            {
              id: 5,
              name: "Rueda Abdominal",
              price: 93.654,
              description: "Rueda para ejercicios de core y abdominales con agarre ergonómico.",
              count: 30
            }
          ];

  updateProducts(products: any[]) {
    this.productsSource.next(products);
  }
  private readonly _http = inject(HttpClient);
  
  private readonly API_URL = environment.apiUrl;
  private readonly BEARER_TOKEN = environment.tmdbBearerToken;
  
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.BEARER_TOKEN}`,
      Accept: 'application/json',
  });
  searchProducts(query: string, page: number): Observable<any> {
      const params = {
        query,
        include_adult: 'false',
        language: 'es-MX',
        page: `${page}`,
      };
      const filteredProducts = this.productsAll.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
  
      const fakeResponse = {
        results: filteredProducts,
        page: page,
        total_pages: 1 // 🔹 Simulamos solo 1 página de resultados
      };
  
      return of(fakeResponse).pipe();
      //return this._http.get<any>(`${this.API_URL}/search/movie`, { headers: this.headers, params });
  }
  getAllProducts():Observable<any>{
    const fakeResponse={
      results: this.productsAll,
    }
    return of(fakeResponse).pipe();
  }
  getProductsMoreSold():Observable<any>{
    const fakeResponse = {
      results: this.productsSold
    };
    return of(fakeResponse).pipe();
  }
  getProductById(id:number): Observable<any>{
    const product:ProductCardDetails|undefined = this.productsAll.find(p=> p.id===id);
    const fakeResponse = {
      results: product
    }
    return of(fakeResponse).pipe();
  }
  updateProduct(product:ProductCardDetails):Observable<any>{
    const fakeResponse = {
      results: 'se actualizo'
    }
    return of(fakeResponse).pipe()
  }
  deleteProductById(id: number):Observable<any>{
    this.productsAll.forEach((pr, index)=> {if(pr.id === id){this.productsAll.splice(index, 1)}})
    
    const fakeResponse = {
      results: 'se elimino'
    }
    return of(fakeResponse).pipe();
  }

}
