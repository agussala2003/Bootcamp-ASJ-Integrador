import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
  name: 'filterByPrice'
})
export class FilterByPricePipe implements PipeTransform {

  transform(value: Product[], args?: any): any {
    if(args == 0) {
      return value.sort((a, b) => a.productName.localeCompare(b.productName));
    }
    if(args == 1) {
      return value.sort((a, b) => a.price - b.price);
    }
    if(args == 2) {
      return value.sort((a, b) => b.price - a.price);
    }
  }
}
