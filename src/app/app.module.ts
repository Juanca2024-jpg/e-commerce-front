import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from "./modules/movie/components/login/login.component";

@NgModule({
	declarations: [
		AppComponent, 
		SkeletonComponent, 
		FooterComponent, 
		HeaderComponent],
	imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LoginComponent
],
	providers: [
		{
			provide: LocationStrategy,
			useClass: PathLocationStrategy,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}