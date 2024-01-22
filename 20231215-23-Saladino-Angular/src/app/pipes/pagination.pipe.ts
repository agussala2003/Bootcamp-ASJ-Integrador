import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], prev: number, next: number): any {
    if (prev === undefined || next === undefined || value.length === 0) {
      return [];
    }

    const startIndex = Math.max(prev, 0);
    const endIndex = Math.min(next, value.length);

    return value.slice(startIndex, endIndex);
  }

}
