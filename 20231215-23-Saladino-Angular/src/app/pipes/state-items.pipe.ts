import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/Order';

@Pipe({
  name: 'stateItems'
})
export class StateItemsPipe implements PipeTransform {

  transform(value: Order[], args?:any): any {
    if(args == 0){
      return value;
    }
    if(args == 1){
      return value.filter((item:Order) => item.status.id == String(1));
    }
    if(args == 2){
      return value.filter((item:Order) => item.status.id == String(2));
    }
    if(args == 3){
      return value.filter((item:Order) => item.status.id == String(3));
    }
    if(args == 4){
      return value.filter((item:Order) => item.status.id == String(4));
    }
    if(args == 5){
      return value.filter((item:Order) => item.status.id == String(5));
    }
    if(args == 6){
      return value.filter((item:Order) => item.status.id == String(6));
    }
    if(args == 7){
      return value.filter((item:Order) => item.status.id == String(7));
    }
    if(args == 8){
      return value.filter((item:Order) => item.status.id == String(8));
    }
  }

}
