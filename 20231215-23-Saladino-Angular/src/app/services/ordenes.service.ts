import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../models/Orden';
import { ordenes } from '../../data/ordenes';
const data:Orden[] = ordenes;
@Injectable({
  providedIn: 'root',
})
export class OrdenesService {
  lista:Orden[] = data;
  constructor(private http: HttpClient) {}
  // public getDatosApi () {
  //   return this.http.get('URL');
  // }
  public getFakeData() {
    return this.lista;
  }
  public uploadFakeData(list: Orden) {
    const index = this.lista.findIndex(item => item.Orden === list.Orden);
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
    this.lista = this.lista.filter(item => parseInt(item.Orden) !== id)
    return this.lista;
  }
}
