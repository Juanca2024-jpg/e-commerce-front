import { Injectable } from '@angular/core';
import { Audit } from '@data/interfaces/audit';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor() { }

  getAllAudit():Observable<any>{
    const audits: Audit[] = [
      {
        idAudit: 1,
        idUser: 101,
        tableAfected: "products",
        idProduct: 5001,
        action: "INSERT",
        date: new Date("2025-02-22T10:30:00Z")
      },
      {
        idAudit: 2,
        idUser: 102,
        tableAfected: "orders",
        idProduct: 0,
        action: "UPDATE",
        date: new Date("2025-02-22T12:15:00Z")
      },
      {
        idAudit: 3,
        idUser: 103,
        tableAfected: "products",
        idProduct: 5002,
        action: "DELETE",
        date: new Date("2025-02-22T14:45:00Z")
      }
    ];
    const fakeResponse={
      results: audits
    }
    return of(fakeResponse).pipe();
  }

}
