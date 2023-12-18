import { Component } from '@angular/core';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';

@Component({
  selector: 'app-form-productosyservicios',
  templateUrl: './form-productosyservicios.component.html',
  styleUrl: './form-productosyservicios.component.css',
})
export class FormProductosyserviciosComponent {
  seleccCodProv = '';
  sku = '';
  categoria = '';
  nomProd = '';
  descripcion = '';
  precio = '';
  agregarProductoyservicio() {
    const newProductoyservicio: ProductoyServicio = {
      Proveedor: this.seleccCodProv,
      Sku: this.sku,
      Categoria: this.categoria,
      Producto: this.nomProd,
      Descripcion: this.descripcion,
      Precio: this.precio,
    };
    if (validarCamposCompletos(newProductoyservicio)) {
      // Llama al servicio para agregar el proveedor
      this.service.uploadFakeData(newProductoyservicio);
      this.seleccCodProv = '';
      this.sku = '';
      this.categoria = '';
      this.nomProd = '';
      this.descripcion = '';
      this.precio = '';
    } else {
      alert('Debes completar todos los campos');
    }
  }
  constructor(public service: ProductosyserviciosService) {}
}

function validarCamposCompletos(productosyservicios: any): boolean {
  // Verifica que todos los campos requeridos estén completos
  return (
    productosyservicios.Proveedor &&
    productosyservicios.Sku &&
    productosyservicios.Categoria &&
    productosyservicios.Producto &&
    productosyservicios.Descripcion &&
    productosyservicios.Precio
  );
}
