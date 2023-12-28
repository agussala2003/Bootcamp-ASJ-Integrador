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
  userState: any;
  total: string = '';

  ngOnInit(): void {
    this.actualizarOrdenes();
    this.userState = this.service.getUserState();
  }

  // Cancelamos la orden
  borrarOrden(idOrden: string) {
    this.service.deleteFakeData(idOrden).subscribe((data) => {
      console.log('Borraste' + data);
    });
    this.actualizarOrdenes();
  }

  // Calculamos el total de la orden
  calcTotal(lista: Orden) {
    if (!lista.Productos || lista.Productos.length === 0) {
      return 0;
    }
    let total = 0;
    lista.Productos.forEach((producto) => {
      const cantidad = parseInt(producto.Cantidad, 10);
      const subtotal = parseFloat(producto.Subtotal);
      if (!isNaN(cantidad) && !isNaN(subtotal)) {
        total += cantidad * subtotal;
      }
    });
    return total.toFixed(2);
  }

  //Actualizamos las ordenes
  actualizarOrdenes() {
    this.service.getFakeData().subscribe((data: Orden[]) => {
      this.ordenes = data;
    });
  }
}
