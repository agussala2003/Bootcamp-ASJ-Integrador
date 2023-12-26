import { Component, OnInit } from '@angular/core';
import { Orden } from '../../../models/Orden';
import { OrdenesService } from '../../../services/ordenes.service';

@Component({
  selector: 'app-tabla-ordenesdecompra',
  templateUrl: './tabla-ordenesdecompra.component.html',
  styleUrl: './tabla-ordenesdecompra.component.css',
})
export class TablaOrdenesdecompraComponent implements OnInit {
  constructor(public service: OrdenesService) {}
  ordenes: Orden[] = [];
  userState:any;
  total: string = '';
  ngOnInit(): void {
    this.actualizarOrdenes();
    this.userState = this.service.getUserState();
  }
  borrarOrden(idOrden:string) {
    if(confirm('Estas seguro que deseas eliminar el producto ' + idOrden)) {
      this.service.deleteFakeData(idOrden);
      alert('El producto ' + idOrden + ' ha sido eliminado correctamente!')
      this.actualizarOrdenes();
    } else {
      alert('El producto ' + idOrden + ' no ha sido eliminado')
    }
  }
  calcTotal(lista:Orden) {
    if (!lista.Productos || lista.Productos.length === 0) {
      return 0;
    }
    let total = 0;
    lista.Productos.forEach(producto => {
      const cantidad = parseInt(producto.Cantidad, 10);
      const subtotal = parseFloat(producto.Subtotal);
      if (!isNaN(cantidad) && !isNaN(subtotal)) {
        total += cantidad * subtotal;
      }
    });
    return total.toFixed(2);
  }
  actualizarOrdenes() {
    this.ordenes = this.service.getFakeData();
  }
}
