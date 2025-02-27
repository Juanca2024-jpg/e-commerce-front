import { NgModule } from '@angular/core';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PaginationComponent } from "./components/pagination/pagination.component";
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { BuyCarComponent } from './components/buy-car/buy-car.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';


@NgModule({
 declarations: [
    SearchBarComponent, 
    ProductListComponent, 
    ProductCardComponent,
    PaginationComponent,
    HomeAdminComponent,
    BuyCarComponent,
],
 imports: [SharedModule, EcommerceRoutingModule],
})

export class EcommerceModule {}