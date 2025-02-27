import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCarComponent } from './buy-car.component';
import { ProductCardDetails } from '@data/interfaces/product-details';
import { OrderService } from '@data/services/order.service';
import { of } from 'rxjs';

describe('BuyCarComponent', () => {
  let component: BuyCarComponent;
  let fixture: ComponentFixture<BuyCarComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    const orderSpy = jasmine.createSpyObj('OrderService', ['createOrder']);

    await TestBed.configureTestingModule({
      declarations: [BuyCarComponent],
      providers: [{ provide: OrderService, useValue: orderSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(BuyCarComponent);
    component = fixture.componentInstance;
    orderServiceSpy = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe eliminar un producto del carrito', () => {
    const product: ProductCardDetails = { id: 1, name: 'Producto 1', price: 100, description: 'test', count: 3 };
    component.products = [product];
    spyOn(sessionStorage, 'setItem');

    component.deleteProductByCarr(product);

    expect(component.products.length).toBe(0);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('productos', JSON.stringify([]));
  });

  it('Debe llamar a createOrder cuando hay productos', () => {
    const product: ProductCardDetails = { id: 1, name: 'Producto 1', price: 100, description: 'test', count: 3 };
    component.products = [product];

    orderServiceSpy.createOrder.and.returnValue(of({ results: 'Orden creada' }));
    spyOn(console, 'log');

    component.createOrder();

    expect(orderServiceSpy.createOrder).toHaveBeenCalledWith(component.products);
    expect(console.log).toHaveBeenCalledWith('Orden creada');
  });

  it('Debe mostrar un mensaje cuando no hay productos al crear la orden', () => {
    component.products = [];
    spyOn(console, 'log');

    component.createOrder();

    expect(console.log).toHaveBeenCalledWith('debe agregar por lo menos un product');
  });
});
