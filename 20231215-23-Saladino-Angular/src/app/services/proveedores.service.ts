import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { proveedores } from '../../data/proveedores';
import { Proveedor } from '../models/Proveedor';
const data:Proveedor[] = proveedores;
@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  lista: Proveedor[] = data;
  constructor(private http: HttpClient) {}
  // public getDatosApi () {
  //   return this.http.get('URL');
  // }
  public getFakeData() {
    return this.lista;
  }
  public uploadFakeData(list: Proveedor) {
    const index = this.lista.findIndex(item => item.Codigo === list.Codigo);
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
    this.lista = this.lista.filter(item => parseInt(item.Codigo) !== id)
    return this.lista;
  }
}
