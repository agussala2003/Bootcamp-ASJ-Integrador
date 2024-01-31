import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
  name: 'atoZ'
})
export class AtoZPipe implements PipeTransform {

  transform(value: Product[], arg1: any,arg2: any): any {
    if (!value || value.length === 0) {
      return value;
    }
    if(arg1!== '0' || arg2 !== '0'){
      return value
    }
    if(arg1 === '0' && arg2 === '0'){
      return value.sort((a, b) => a.productName.localeCompare(b.productName));
    }
  }

}
