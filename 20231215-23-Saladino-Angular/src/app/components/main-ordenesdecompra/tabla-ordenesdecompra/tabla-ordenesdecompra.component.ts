import { Component, OnInit } from '@angular/core';
import { Orden } from '../../../models/Orden';
import { OrdenesService } from '../../../services/ordenes.service';

@Component({
  selector: 'app-tabla-ordenesdecompra',
  templateUrl: './tabla-ordenesdecompra.component.html',
  styleUrls: ['./tabla-ordenesdecompra.component.css'], // Ajustado el nombre de la propiedad
})
export class TablaOrdenesdecompraComponent implements OnInit {
  constructor(public service: OrdenesService) {}

  datosOrd: Orden = {
    id: '',
    Emision: '',
    Entrega: '',
    InfoRecepcion: '',
    Proveedor: '',
    Productos: [],
    Activo: true,
    Total: '',
  };

  ordenes: Orden[] = [];
  userState: any;
  total: string = '';
  isDeleting:boolean = false;
  ord:string = '';
  prevPage: number = 0;
  nextPage: number = 5;
  isActiveItems: boolean = true;

  ngOnInit(): void {
    this.actualizarOrdenes();
    this.userState = this.service.getUserState();
  }

  borrarOrden(idOrden: string) {
    this.service.deleteFakeData(idOrden).subscribe((data) => {
      console.log(`Borraste ${data}`);
      this.actualizarOrdenes();
    });
  }

  calcTotal(lista: Orden): string {
    if (!lista.Productos || lista.Productos.length === 0) {
      return '0.00';
    }
    let total = 0;
    lista.Productos.forEach((producto) => {
      const cantidad = parseInt(producto.Cantidad, 10) || 0;
      const subtotal = parseFloat(producto.Subtotal) || 0;
      if (!isNaN(cantidad) && !isNaN(subtotal)) {
        total += cantidad * subtotal;
      }
    });
    return total.toFixed(2);
  }

  getOrden(id: string,state:boolean): void {
    this.service.getProdData(id).subscribe((data: Orden) => {
      this.datosOrd = data;
      this.isDeleting = state;
    });
  }

  activarOrden(id:string): void {
    this.service.activeOrden(id).subscribe((data) => {
      console.log(`Activaste ${data}`);
      this.actualizarOrdenes();
    });
  }

  actualizarOrdenes(): void {
    this.service.getFakeData().subscribe((data: Orden[]) => {
      this.ordenes = data.filter((item:Orden) => item.Activo);
    });
  }
  private filtrarProductosInactivos(productos: Orden[],state:boolean): Orden[] {
    return productos.filter((producto) => producto.Activo === state);
  }

  goPrevPage(){
    this.prevPage -= 5;
    this.nextPage -= 5;
  }
  goNextPage(){
    this.prevPage += 5;
    this.nextPage += 5;
  }
  changeState(){
    this.isActiveItems = !this.isActiveItems
    this.service.getFakeData().subscribe((data:Orden[]) => {
      this.ordenes = this.filtrarProductosInactivos(data, this.isActiveItems);
    })
  }
}
