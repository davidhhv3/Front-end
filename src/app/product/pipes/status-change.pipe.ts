import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusChange'
})
export class StatusChangePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value===1)
      return  "En Stock";
    if(value===2)
      return  "Vendido";
    
    if(value===3)
      return  "Defectuoso";
    
    return value;
  }

}
