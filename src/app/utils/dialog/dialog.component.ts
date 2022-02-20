import { Component, OnInit ,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  text:string="";


  constructor(@Inject(MAT_DIALOG_DATA) public data: {text: string} ) { }

  ngOnInit(): void {
    this.text=this.data.text;    
  }

}
