import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
  name: 'atoZ'
})
export class AtoZPipe implements PipeTransform {

  transform(value: Product[], ...args: any): any {
    if (!value || value.length === 0) {
      return value; // Devuelve el array sin cambios si está vacío o nulo
    }
    // Utiliza el método sort para ordenar el array por el nombre del proveedor, el LocalCompare compara entre los dos strings del producto
    return value.sort((a, b) => a.productName.localeCompare(b.productName));
  }

}
