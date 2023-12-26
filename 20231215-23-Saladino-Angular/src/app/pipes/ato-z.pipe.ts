import { Pipe, PipeTransform } from '@angular/core';
import { ProductoyServicio } from '../models/ProductoyServicio';

@Pipe({
  name: 'atoZ'
})
export class AtoZPipe implements PipeTransform {

  transform(value: ProductoyServicio[], ...args: any): any {
    if (!value || value.length === 0) {
      return value; // Devuelve el array sin cambios si está vacío o nulo
    }
    // Utiliza el método sort para ordenar el array por el nombre del proveedor, el LocalCompare compara entre los dos strings del producto
    return value.sort((a, b) => a.Producto.localeCompare(b.Producto));
  }

}
