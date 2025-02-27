import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

describe('TokenService', () => {
  let service: TokenService;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(TokenService);
    sessionStorage.clear(); // Limpiar el storage antes de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve token', () => {
    service.setToken('fake-token');
    expect(service.getToken()).toBe('fake-token');
  });

  it('should remove token on signUp', () => {
    service.setToken('fake-token');
    service.signUp();
    expect(service.getToken()).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith([""]);
  });

  it('should return false when no token is set', () => {
    expect(service.isLogged()).toBeFalse();
  });

  it('should return true when a token is set', () => {
    service.setToken('fake-token');
    expect(service.isLogged()).toBeTrue();
  });

  it('should decode token payload and return values correctly', () => {
    const fakePayload = {
      id: '123',
      rol: ['admin'],
      nickname: 'user123',
      name: 'John Doe',
      photo: 'profile.jpg'
    };
    const encodedPayload = btoa(JSON.stringify(fakePayload)); // Codificar en Base64
    const fakeToken = `header.${encodedPayload}.signature`;

    service.setToken(fakeToken);

    expect(service.getCodigo()).toBe('123');
    expect(service.getRole()).toBe('admin');
    expect(service.getNickName()).toBe('user123');
    expect(service.getName()).toBe('John Doe');
    expect(service.getPhoto()).toBe('profile.jpg');
  });

  it('should return empty values when no token is set', () => {
    expect(service.getCodigo()).toBe('');
    expect(service.getRole()).toBe('');
    expect(service.getNickName()).toBe('');
    expect(service.getName()).toBe('');
    expect(service.getPhoto()).toBe('');
  });

});
