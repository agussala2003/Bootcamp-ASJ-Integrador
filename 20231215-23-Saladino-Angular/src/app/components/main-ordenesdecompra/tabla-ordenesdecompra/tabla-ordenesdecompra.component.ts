import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla-ordenesdecompra',
  templateUrl: './tabla-ordenesdecompra.component.html',
  styleUrl: './tabla-ordenesdecompra.component.css'
})
export class TablaOrdenesdecompraComponent {
  ordenes: Orden[] = [
    {
      Orden: 3,
      Emision: "2023-03-05",
      Entrega: "2023-03-12",
      Direccion: "Plaza Principal 789, Ciudad C",
      Proveedor: 3,
      Producto: 303,
      Cantidad: 25,
    },
    {
      Orden: 2,
      Emision: "2023-02-01",
      Entrega: "2023-02-10",
      Direccion: "Avenida Central 456, Ciudad B",
      Proveedor: 2,
      Producto: 202,
      Cantidad: 30,
    },
    {
      Orden: 3,
      Emision: "2023-03-05",
      Entrega: "2023-03-12",
      Direccion: "Plaza Principal 789, Ciudad C",
      Proveedor: 3,
      Producto: 303,
      Cantidad: 25,
    }
  ]
}

type Orden = {
    Orden: number,
    Emision: string,
    Entrega: string,
    Direccion: string,
    Proveedor: number,
    Producto: number,
    Cantidad: number
}
