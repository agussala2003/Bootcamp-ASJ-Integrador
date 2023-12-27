import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../models/Orden';
import { ordenes } from '../../data/ordenes';
const data:Orden[] = ordenes;
@Injectable({
  providedIn: 'root',
})
export class OrdenesService {
  constructor(private http: HttpClient) {}
  lista:Orden[] = data;
  datosOrd: Orden = {
    Orden: '',
    Emision: '',
    Entrega: '',
    InfoRecepcion: '',
    Proveedor: '',
    Productos: [],
    Activo: true,
    Total: ''
  }
  public getFakeData() {
    return this.lista;
  }
  public uploadFakeData() {
    const index = this.lista.findIndex(item => item.Orden === this.datosOrd.Orden);
    const newOrden:Orden = {...this.datosOrd};
    if (index !== -1) {
      // Si existe, actualiza el elemento en la posición index
      alert('Ya tienes uno con esa orden. Actualizando...');
      this.lista[index] = newOrden;
    } else {
      // Si no existe, agrega el nuevo elemento
      alert('No existe. Agregando...');
      this.lista.push(newOrden);
    }
  }
  public deleteFakeData(id: string) {
    const index = this.lista.findIndex(item => item.Orden === id);
    this.lista[index].Activo = false;
  }
  public getProdData(id: string) {
    const num = this.lista.findIndex(item => item.Orden === id);
    if (num !== -1) {
      this.datosOrd = { ...this.lista[num] };
    }
  }
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(localStorage.getItem('inicio') || 'null');
    return valor !== null ? valor : null;
  }
}
