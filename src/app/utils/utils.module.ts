import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialDesingModule } from '../material-desing/material-desing.module';



@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialDesingModule
  ],
  exports:[
    DialogComponent
  ]
})
export class UtilsModule { }
