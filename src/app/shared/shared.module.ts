import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

//import * as components from './components';

@NgModule({
 imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
 ],
 providers: [ provideHttpClient () ],
 //declarations: [...components.components],
 exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
   // ...components.components
 ],
})
export class SharedModule {}