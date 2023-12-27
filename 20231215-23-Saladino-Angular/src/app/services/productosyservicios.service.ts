import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoyServicio } from '../models/ProductoyServicio';
import { productosyServicios } from '../../data/productosyservicios';
const data:ProductoyServicio[] = productosyServicios;
@Injectable({
  providedIn: 'root',
})
export class ProductosyserviciosService {
  constructor(private http: HttpClient) {}
  lista:ProductoyServicio[] = data;
  datosProd: ProductoyServicio = {
    Proveedor: '',
    Sku: '',
    Categoria: '',
    Producto: '',
    Descripcion: '',
    Precio: '',
    Imagen: '',
    Activo:true
  }
  public getFakeData() {
    return this.lista;
  }
  public uploadFakeData() {
    const index = this.lista.findIndex(item => item.Sku === this.datosProd.Sku);
    const newProd: ProductoyServicio = {...this.datosProd};
    if (index !== -1) {
      // Si existe, actualiza el elemento en la posición index
      alert('Ya tienes uno con ese sku. Actualizando...');
      this.lista[index] = newProd;
    } else {
      // Si no existe, agrega el nuevo elemento
      alert('No existe. Agregando...');
      this.lista.push(newProd);
    }
  }
  public deleteFakeData(id: string) {
    const index = this.lista.findIndex(item => item.Sku === id);
    this.lista[index].Activo = false;
  }
  public getProdData(id: string) {
    const num = this.lista.findIndex(item => item.Sku === id);
    if (num !== -1) {
      this.datosProd = { ...this.lista[num] };
    }
  }
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(localStorage.getItem('inicio') || 'null');
    return valor !== null ? valor : null;
  }
}
