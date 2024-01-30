import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: Product[], args?: any): any {
    if(args === '' || args === undefined){
      return value;
    }

    return value.filter((item: Product) => item.category.id == args);
  }

}
