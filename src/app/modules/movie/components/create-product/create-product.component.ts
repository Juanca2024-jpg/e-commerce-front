import { Component } from '@angular/core';
import { ProductCardDetails } from '@data/interfaces/product-details';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTooltipModule, RouterModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  nameAlert: boolean = false;
  descriptionAlert: boolean = false;
  priceAlert: boolean = false;
  countAlert: boolean = false;
  createProduct: ProductCardDetails = {
    id: 2,
    name: '',
    price: 0,
    description: '',
    count: 0
  };
  addBusiness() {
    if (this.createProduct.name == '') {
      this.nameAlert = true;
    } else {
      this.nameAlert = false;
    }
    if (this.createProduct.description == '') {
      this.descriptionAlert = true;
    } else {
      this.descriptionAlert = false;
    }

    if (this.createProduct.price <= 0) {
      this.priceAlert = true;
    } else {
      this.priceAlert = false;
    }

    if (this.createProduct.count <= 0) {
      this.countAlert = true;
    } else {
      this.countAlert = false;
    }
    
    if (this.createProduct.name !== '' && this.createProduct.description !== '' ) {
      console.log('entro');
      console.log(this.createProduct.id);
      /* this.client.addBusiness(add).subscribe({
        next: (data) => {
          this.popup.openSnackBar(data.respuesta);
        },
        error: (error) => {
          this.popup.openSnackBar(error.error.respuesta);
        }
      }); */
    }


  }
}
