import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductCardDetails } from '@data/interfaces/product-details';
import { ProductServiceService } from '@data/services/product-service.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTooltipModule, RouterModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
nameAlert: boolean = false;
  descriptionAlert: boolean = false;
  priceAlert: boolean = false;
  countAlert: boolean = false;
  product: ProductCardDetails = {
    id: 2,
    name: '',
    price: 0,
    description: '',
    count: 0
  };
  constructor(private route: ActivatedRoute, private productService: ProductServiceService){}
  productId:number = 0;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });
    this.productService.getProductById(this.productId).subscribe({
      next: (response)=>{
        this.product=response.results;
      },
      error: (err)=>{
        console.log('error fetching the product by id', err);
      }
    });

  }
  updateProduct() {
    if (this.product.name == '') {
      this.nameAlert = true;
    } else {
      this.nameAlert = false;
    }
    if (this.product.description == '') {
      this.descriptionAlert = true;
    } else {
      this.descriptionAlert = false;
    }

    if (this.product.price <= 0) {
      this.priceAlert = true;
    } else {
      this.priceAlert = false;
    }

    if (this.product.count <= 0) {
      this.countAlert = true;
    } else {
      this.countAlert = false;
    }
    
    if (this.product.name !== '' && this.product.description !== '' ) {
      this.productService.updateProduct(this.product).subscribe({
        next: (response) =>{
          console.log(response.results);
        },
        error: (err)=>{
          console.log('error updating the product: ', err);
        }
      });
    }


  }
}
