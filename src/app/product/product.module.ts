import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FilterPipe } from './pipes/filter.pipe';
import { StatusChangePipe } from './pipes/status-change.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialDesingModule } from '../material-desing/material-desing.module';
import { UtilsModule } from '../utils/utils.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    FilterPipe,
    StatusChangePipe
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    MaterialDesingModule,
    UtilsModule,
    ToastrModule.forRoot()
  ]
})
export class ProductModule { }
