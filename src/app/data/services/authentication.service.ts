import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUser } from '@data/interfaces/create-user';
import { login } from '@data/interfaces/login';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  getToken(login:login):Observable<any>{
    const fakeResponse={
      results: 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwicm9sIjpbIkFkbWluIl0sInN1YiI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNzQwMzQ4MDc3LCJleHAiOjE3NDA0MzQ0Nzd9.5jAYeT37nQzuJ8x8JbTPRPNdMmwNYUfaJp-iCHOU0Cc',
    }
    return of(fakeResponse).pipe();
    //return this.http.post<any>('', login);
  }
  createUser(user:createUser):Observable<any>{
    const fakeResponse={
      results: 'se creo el usurio'
    }
    return of(fakeResponse).pipe();
  }

}
