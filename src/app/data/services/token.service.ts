import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private router:Router){}
  setToken(token:string){
    window.sessionStorage.removeItem("token");
    window.sessionStorage.setItem("token", token);
  }
  getToken():string|null{
    return window.sessionStorage.getItem("token");
  }
  signUp(){
    window.sessionStorage.clear();
    this.router.navigate([""]);
  }
  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
  private decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }
  public getCodigo(): string {
    const token = this.getToken();
    if (token) {
    const values = this.decodePayload(token);
    return values.id;
    }
    return "";
  }
  public getRole(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol[0];
    }
    return "";
  }
  public getNickName(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.nickname;
    }
    return "";
  }
  public getName(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.name;
    }
    return "";
  }
  public getPhoto(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.photo;
    }
    return "";
  }
}
