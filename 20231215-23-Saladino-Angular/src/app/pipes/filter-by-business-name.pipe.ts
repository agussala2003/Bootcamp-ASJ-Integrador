import { Pipe, PipeTransform } from '@angular/core';
import { Supplier } from '../models/Supplier';

@Pipe({
  name: 'filterByBusinessName'
})
export class FilterByBusinessNamePipe implements PipeTransform {

  transform(value: Supplier[], args?: any): any {
    if(args == 0) {
      return value.sort((a, b) => a.businessName.localeCompare(b.businessName));
    }
    if(args == 1) {
      return value.sort((a, b) => b.businessName.localeCompare(a.businessName));
    }
  }

}
