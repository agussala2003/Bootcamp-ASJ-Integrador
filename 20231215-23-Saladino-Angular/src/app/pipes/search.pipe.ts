import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if(args === '' || args === undefined){
      return value;
    }

    return value.filter((item) => deepSearch(item, args));
  }

}

function deepSearch(obj: any, searchTerm: string): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'object') {
        if (deepSearch(value, searchTerm)) {
          return true;
        }
      } else if (typeof value === 'string' && value.includes(searchTerm)) {
        return true;
      }
    }
  }
  return false;
}