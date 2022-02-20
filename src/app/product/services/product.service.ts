import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "../models/Products";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string="https://localhost:7071/api/Products";

  constructor(private http:HttpClient) { }

  getallproducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.url);
  }
  getProduct(id: number):Observable<Products>{
    return this.http.get<Products>(this.url+'/'+id);
  }
  updateProduct(id: string|number, product:Products){      
    return this.http.put(this.url+'/'+id,product);          
  }
  saveProduct(product:Products){
    return this.http.post(this.url,product);
  }
  deleteProduct(id:number){
    return this.http.delete(this.url+'/'+id);
  }
 

}
