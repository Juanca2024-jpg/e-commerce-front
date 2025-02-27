import { Component, inject, Input } from '@angular/core';
import { ProductServiceService } from '@data/services/product-service.service';
import { TmdbService } from '@data/services/tmdb.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: any[] = [];
  constructor(private productService: ProductServiceService) {}
  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.products = products;
    });
    console.log(this.products)
  }

  
}
