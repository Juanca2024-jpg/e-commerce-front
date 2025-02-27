import { Component } from '@angular/core';
import { Audit } from '@data/interfaces/audit';
import { AuditService } from '@data/services/audit.service';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.css'
})
export class AuditComponent {
  audits: Audit[] = [];
  constructor(private audit: AuditService){}
  ngOnInit(): void {
    this.audit.getAllAudit().subscribe({
      next: (response)=>{
        this.audits = response.results;
      },
      error: (err)=>{
        console.log('error fetching audits ', err)
      }
    });
  }  

}
