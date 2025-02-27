import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {

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
    return this._http.get<any>(`${this.API_URL}/search/movie`, { headers: this.headers, params });
  }
  
  getMovieDetails(movieId: number): Observable<any> {
    
    return this._http.get(`${this.API_URL}/movie/${movieId}?language=en-US`, { headers: this.headers });
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
