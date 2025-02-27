import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductServiceService } from './product-service.service';
import { ProductCardDetails } from '@data/interfaces/product-details';

describe('ProductServiceService', () => {
  let service: ProductServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Simulación de peticiones HTTP
      providers: [ProductServiceService]
    });
    service = TestBed.inject(ProductServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all products', () => {
    service.getAllProducts().subscribe(response => {
      expect(response.results.length).toBe(5);
      expect(response.results[0].name).toBe('Mancuernas Ajustables');
    });
  });

  it('should return products matching search query', () => {
    service.searchProducts('Mancuernas', 1).subscribe(response => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].name).toBe('Mancuernas Ajustables');
    });
  });

  it('should return the most sold products', () => {
    service.getProductsMoreSold().subscribe(response => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].name).toBe('Rueda Abdominal');
    });
  });

  it('should return a product by ID', () => {
    service.getProductById(2).subscribe(response => {
      expect(response.results).toBeDefined();
      expect(response.results.name).toBe('Banda de Resistencia');
    });
  });

  it('should update a product', () => {
    const updatedProduct: ProductCardDetails = {
      id: 2,
      name: 'Banda de Resistencia PRO',
      price: 80.000,
      description: 'Banda de resistencia mejorada',
      count: 30
    };

    service.updateProduct(updatedProduct).subscribe(response => {
      expect(response.results).toBe('se actualizo');
    });
  });

  it('should delete a product by ID', () => {
    service.deleteProductById(2).subscribe(response => {
      expect(response.results).toBe('se elimino');
      service.getAllProducts().subscribe(res => {
        expect(res.results.find((p:any) => p.id === 2)).toBeUndefined();
      });
    });
  });

  it('should update the observable with new product list', () => {
    const newProducts: ProductCardDetails[] = [
      {
        id: 10,
        name: 'Nueva Mancuerna',
        price: 300.000,
        description: 'Mancuerna ajustable nueva',
        count: 15
      }
    ];

    service.updateProducts(newProducts);
    service.products$.subscribe(updatedProducts => {
      expect(updatedProducts.length).toBe(1);
      expect(updatedProducts[0].name).toBe('Nueva Mancuerna');
    });
  });

});
