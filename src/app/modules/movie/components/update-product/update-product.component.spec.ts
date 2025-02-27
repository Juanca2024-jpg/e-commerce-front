import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProductComponent } from './update-product.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductServiceService } from '@data/services/product-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  let productService: ProductServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, UpdateProductComponent],  // Se mueve a imports
      providers: [
        ProductServiceService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '2' })  // Simula el parámetro ID en la URL
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductServiceService);

    spyOn(productService, 'getProductById').and.returnValue(of({
      results: {
        id: 2,
        name: 'Producto de prueba',
        price: 100,
        description: 'Descripción de prueba',
        count: 5
      }
    }));

    spyOn(productService, 'updateProduct').and.returnValue(of({ results: 'Producto actualizado' }));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product details on init', () => {
    expect(component.product).toEqual({
      id: 2,
      name: 'Producto de prueba',
      price: 100,
      description: 'Descripción de prueba',
      count: 5
    });
    expect(productService.getProductById).toHaveBeenCalledWith(2);
  });

  it('should validate form fields and prevent update when empty', () => {
    component.product.name = '';
    component.product.description = '';
    component.product.price = -1;
    component.product.count = 0;

    component.updateProduct();

    expect(component.nameAlert).toBeTrue();
    expect(component.descriptionAlert).toBeTrue();
    expect(component.priceAlert).toBeTrue();
    expect(component.countAlert).toBeTrue();
    expect(productService.updateProduct).not.toHaveBeenCalled();
  });

  it('should call updateProduct when form is valid', () => {
    component.product.name = 'Producto Actualizado';
    component.product.description = 'Descripción Actualizada';
    component.product.price = 200;
    component.product.count = 10;

    component.updateProduct();

    expect(productService.updateProduct).toHaveBeenCalledWith(component.product);
  });
});
