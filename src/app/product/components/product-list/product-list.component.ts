import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {  Products} from "../../models/Products";
import { LoadingService } from 'src/app/utils/services/loading-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:Products[]=[];
  filter:string="Todos";
  idStatus:number=0;

  constructor(private productService:ProductService,
              private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(){
    this.loadingService.setLoading(true);    
    this.productService.getallproducts()
    .subscribe(
      res=>{
        this.products=res; 
        this.loadingService.setLoading(false);             
      },
      err=>{
        console.log(err);
      }
    )
  }
  filterN(number:number){
    this.idStatus=number;
  }


}
