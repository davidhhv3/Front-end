import { Pipe, PipeTransform } from '@angular/core';
import { Products} from "../models/Products";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products:Products[],idStatus:number=0,...args: unknown[]): Products[] {
    if(idStatus===0)
      return products;    
    
    const filterProducts = products.filter(product =>{ return product.status_idStatus==idStatus})
    
    return filterProducts;
    
  }

}
