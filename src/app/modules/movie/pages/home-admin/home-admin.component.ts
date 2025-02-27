import { state } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '@data/services/product-service.service';
import { TmdbService } from '@data/services/tmdb.service';
import { TokenService } from '@data/services/token.service';
import { routes } from 'src/app/app-routing.module';
import {ProductCardDetails} from 'src/app/data/interfaces/product-details'
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  private readonly _tmdbService = inject(TmdbService);
    private readonly _viewportScroller = inject(ViewportScroller)
    constructor( private productService: ProductServiceService,private router: Router, private token: TokenService){}
    query: string = '';
    filter: String= ''
    page: number = 1;
    total_page: number = 0;
    isAdmin: boolean = false;

    products: ProductCardDetails[] = [];
    ngOnInit(): void {
      if(this.token.getRole() === 'Admin'){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
      this.productService.getAllProducts().subscribe({
        next: (response)=>{
          this.products = response.results;
          this.productService.updateProducts(this.products);
        },
        error: (err)=>{
          console.log("Error featching products: ", err);
        }
      });
      
    }
  
    onSearch(event: {query:string, filter:string}) {
      console.log(event.query.length)
      if(event.query.length===0){
        this.productService.getAllProducts().subscribe({
          next: (response)=>{
            this.products = response.results;
          },
          error: (err)=>{
            console.log("Error featching products: ", err);
          }
        })
      }else{
        this.productService.searchProducts(event.query, this.page).subscribe({
          next: (response) => {
            this.query = event.query; 
            this.filter = event.filter;  
            this.products = response.results;
            this.page = response.page;
            this.total_page = response.total_pages;
          },
          error: (err) => {
            console.error('Error fetching products:', err);
          }
        });
      }
      this.productService.updateProducts(this.products);

      if (this.router.url !== '/ecommerce/home/list-products') {
        this.router.navigate(['/ecommerce/home/list-products']);
      }
    }
  
    changePage(page: string){
      this.page = +page;
      this.products = [];
      this.onSearch({query: this.query, filter:''});
      this._viewportScroller.scrollToPosition([0, 0]);
    }
    changeToProductsSold(){
      this.productService.getProductsMoreSold().subscribe({
        next: (response)=>{
          this.products = response.results;
        },
        error: (err) =>{
          console.log("error fetching products more sold: ", err);
        }

      });
      this.productService.updateProducts(this.products);
      this.router.navigate(['/ecommerce/home/products-more-sold'], {state: { allProduct: this.products }});
    }
    changeAllProducts(){
      this.productService.getAllProducts().subscribe({
        next: (response)=>{
          this.products = response.results;
        },
        error: (err)=>{
          console.log("Error featching products: ", err);
        }
      })
      this.productService.updateProducts(this.products);
      this.router.navigate(['/ecommerce/home/list-products'], {state: { allProduct: this.products }});
      
    }
    changeToAudit(){
      this.router.navigate(['/ecommerce/home/audit'])
    }
}
