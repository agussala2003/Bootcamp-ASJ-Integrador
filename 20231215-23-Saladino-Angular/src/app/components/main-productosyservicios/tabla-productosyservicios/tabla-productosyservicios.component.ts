import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla-productosyservicios',
  templateUrl: './tabla-productosyservicios.component.html',
  styleUrl: './tabla-productosyservicios.component.css'
})
export class TablaProductosyserviciosComponent {
  productosyServicios: ProductoyServicio[] = [
    {
      Proveedor: 1,
      Sku: 101,
      Categoria: "Electrónica",
      Producto: "Smartphone",
      Descripcion: "Teléfono inteligente con pantalla táctil",
      Precio: 499.99,
    },
    {
      Proveedor: 2,
      Sku: 202,
      Categoria: "Hogar",
      Producto: "Aspiradora",
      Descripcion: "Aspiradora sin bolsa con tecnología ciclónica",
      Precio: 129.99,
    },
    {
      Proveedor: 3,
      Sku: 303,
      Categoria: "Ropa",
      Producto: "Zapatos deportivos",
      Descripcion: "Zapatos cómodos para actividades deportivas",
      Precio: 79.99,
    }
  ]
}
type ProductoyServicio = {
  Proveedor: number,
  Sku: number,
  Categoria: string,
  Producto: string,
  Descripcion: string,
  Precio: number
};
