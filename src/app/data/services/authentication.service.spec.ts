import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AuthenticationService]
      });
      service = TestBed.inject(AuthenticationService);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
