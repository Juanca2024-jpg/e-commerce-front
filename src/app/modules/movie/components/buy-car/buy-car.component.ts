import { Component } from '@angular/core';
import { ProductCardDetails } from '@data/interfaces/product-details';
import { OrderService } from '@data/services/order.service';

@Component({
  selector: 'app-buy-car',
  templateUrl: './buy-car.component.html',
  styleUrl: './buy-car.component.css'
})
export class BuyCarComponent {
  storage = sessionStorage.getItem('productos');
  products:ProductCardDetails[]= this.storage?JSON.parse(this.storage): [];
  constructor(private order:OrderService){}

  deleteProductByCarr(product:ProductCardDetails){
    this.products.forEach((p, index)=>{
      if(p.id===product.id){
        this.products.splice(index, 1);
      }
    });
    sessionStorage.setItem('productos', JSON.stringify(this.products));
  }
  createOrder(){
    if(this.products.length>=1){
      this.order.createOrder(this.products).subscribe({
        next: (response)=>{
          console.log(response.results);
        },
        error: (err)=>{
          console.log('error creating the order for products', err);
        }
      });
    }else{
      console.log('debe agregar por lo menos un product');
    }
  }

}
