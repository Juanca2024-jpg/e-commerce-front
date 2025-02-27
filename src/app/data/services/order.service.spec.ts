import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductCardDetails } from '@data/interfaces/product-details';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an order and return confirmation message', (done) => {
    const mockProducts: ProductCardDetails[] = [
      {
        id: 1,
        name: "Mancuernas Ajustables",
        price: 492.800,
        description: "Set de mancuernas con pesos ajustables de 2kg a 20kg.",
        count: 10
      }
    ];

    service.createOrder(mockProducts).subscribe(response => {
      expect(response.results).toBe('se agrego correctamente la orden');
      done();
    });
  });

});
