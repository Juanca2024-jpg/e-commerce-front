import { TestBed } from '@angular/core/testing';
import { AuditService } from './audit.service';
import { Audit } from '@data/interfaces/audit';

describe('AuditService', () => {
  let service: AuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditService]
    });
    service = TestBed.inject(AuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of audits', (done) => {
    service.getAllAudit().subscribe(response => {
      expect(response.results).toBeDefined();
      expect(Array.isArray(response.results)).toBeTrue();
      expect(response.results.length).toBe(3);

      const firstAudit: Audit = response.results[0];
      expect(firstAudit.idAudit).toBe(1);
      expect(firstAudit.idUser).toBe(101);
      expect(firstAudit.tableAfected).toBe('products');
      expect(firstAudit.action).toBe('INSERT');
      expect(firstAudit.date).toEqual(new Date("2025-02-22T10:30:00Z"));

      done();
    });
  });

});
