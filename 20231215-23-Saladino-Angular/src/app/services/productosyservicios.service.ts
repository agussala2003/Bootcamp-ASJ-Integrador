import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoyServicio } from '../models/ProductoyServicio';
import { productosyServicios } from '../../data/productosyservicios';
const data:ProductoyServicio[] = productosyServicios;
@Injectable({
  providedIn: 'root',
})
export class ProductosyserviciosService {
  lista:ProductoyServicio[] = data;
  constructor(private http: HttpClient) {}
  // public getDatosApi () {
  //   return this.http.get('URL');
  // }
  public getFakeData() {
    return this.lista;
  }
  public uploadFakeData(list: ProductoyServicio) {
    const index = this.lista.findIndex(item => item.Sku === list.Sku);
    if (index !== -1) {
      // Si existe, actualiza el elemento en la posición index
      alert('Ya tienes uno con esa orden. Actualizando...');
      this.lista[index] = list;
    } else {
      // Si no existe, agrega el nuevo elemento
      alert('No existe. Agregando...');
      this.lista.push(list);
    }
  }
  public deleteFakeData(id: number) {
    console.log(id)
    this.lista = this.lista.filter(item => parseInt(item.Sku) !== id)
    return this.lista;
  }
}
