import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { AuditComponent } from './components/audit/audit.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { BuyCarComponent } from './components/buy-car/buy-car.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'create-user', component: CreateUserComponent},
    { path: 'create-product', component: CreateProductComponent},
    { path: 'home', component: HomeAdminComponent, children:[
        { path: 'audit', component: AuditComponent},
        { path: 'list-products', component: ProductListComponent, runGuardsAndResolvers: 'always'},
        { path: 'products-more-sold', component: ProductListComponent, runGuardsAndResolvers: 'always'},
        { path: 'create-product', component: CreateProductComponent},
        { path: 'update-product/:id', component: UpdateProductComponent},
        { path: 'buy-car', component: BuyCarComponent},
        { path: '**', redirectTo: 'list-products', pathMatch: 'full' },
    ]},
    { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})

export class EcommerceRoutingModule {}