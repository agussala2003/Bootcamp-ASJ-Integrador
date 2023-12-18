import { Component } from '@angular/core';
import { OrdenesService } from '../../../services/ordenes.service';
import { Orden } from '../../../models/Orden';

@Component({
  selector: 'app-form-ordenesdecompra',
  templateUrl: './form-ordenesdecompra.component.html',
  styleUrl: './form-ordenesdecompra.component.css',
})
export class FormOrdenesdecompraComponent {
  seleccCodProv = '';
  seleccCodProd = '';
  orden = '';
  calleynumOrdenes = '';
  emision = '';
  entrega = '';
  cantidad = '';
  agregarOrden() {
    const newOrden: Orden = {
      Orden: this.orden,
      Emision: this.emision,
      Entrega: this.entrega,
      Direccion: this.calleynumOrdenes,
      Proveedor: this.seleccCodProv,
      Producto: this.seleccCodProd,
      Cantidad: this.cantidad,
    };
    if (validarCamposCompletos(newOrden)) {
      // Llama al servicio para agregar el proveedor
      this.service.uploadFakeData(newOrden);
      this.seleccCodProv = '';
      this.seleccCodProd = '';
      this.orden = '';
      this.calleynumOrdenes = '';
      this.emision = '';
      this.entrega = '';
      this.cantidad = '';
    } else {
      alert('Debes completar todos los campos');
    }
  }
  constructor(public service: OrdenesService) {}
}

function validarCamposCompletos(ordenes: any): boolean {
  // Verifica que todos los campos requeridos estén completos
  return (
    ordenes.Orden &&
    ordenes.Emision &&
    ordenes.Entrega &&
    ordenes.Direccion &&
    ordenes.Proveedor &&
    ordenes.Producto &&
    ordenes.Cantidad
  );
}
