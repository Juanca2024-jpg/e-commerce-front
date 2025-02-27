import { Component, inject, Input } from '@angular/core';
import { IMAGEN_BASE, MAX_DESCRIPCION, MAX_TITLE } from '@data/constants/movie';
import { ProductCardDetails} from '@data/interfaces/product-details';
import { ProductServiceService } from '@data/services/product-service.service';
import { TmdbService } from '@data/services/tmdb.service';
import { TokenService } from '@data/services/token.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  private readonly _tmdbService = inject(TmdbService);
  constructor(private token: TokenService, private productService: ProductServiceService){}
  @Input() product : ProductCardDetails = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    count: 0
  };
  isAdmin: boolean=false;
  ngOnInit(): void {
    if(this.token.getRole()==='Admin'){
      this.isAdmin= true;
    }else{
      this.isAdmin=false
    }
  }

  getImage(path: string): string{
    if (path == null || ''){
      console.log(path)
      return IMAGEN_BASE;
    }
    return this._tmdbService.getImageUrl(path);
  }

  maxTitle(title: string): string{
    if( title.length > MAX_TITLE){
      return `${title.substring(0,MAX_TITLE)}...`
    }
    return title;
  }

  maxDescription(sinosis: string): string{
    if( sinosis.length > MAX_DESCRIPCION){
      return `${sinosis.substring(0,MAX_DESCRIPCION)}...`
    }
    return sinosis;
  }
  deleteProduct(id:number){
    this.productService.deleteProductById(id).subscribe({
      next: (response)=>{
        console.log(response.results);
      },
      error: (err) =>{
        console.log('Error deleting the product', err);
      }
    });
  }
  addProductToCar(product:ProductCardDetails){
    const storage = sessionStorage.getItem('productos');
    const products:ProductCardDetails[] = storage ? JSON.parse(storage) : [];;
    let exist = false;
    products.forEach(p=>{
      if(p.id===product.id){
        exist=true;
      }
    });
    if(!exist){
      products.push(product);
    }
    sessionStorage.setItem('productos', JSON.stringify(products));
  }

}
