import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateItems'
})
export class StateItemsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
