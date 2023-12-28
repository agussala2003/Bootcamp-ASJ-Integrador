import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../models/Orden';
// import { ordenes } from '../../data/ordenes';
import { Observable, tap } from 'rxjs';
// const data:Orden[] = ordenes;
@Injectable({
  providedIn: 'root',
})
export class OrdenesService {
  constructor(private http: HttpClient) {}
  lista:Orden[] = [];
  datosOrd: Orden = {
    id: '',
    Emision: '',
    Entrega: '',
    InfoRecepcion: '',
    Proveedor: '',
    Productos: [],
    Activo: true,
    Total: ''
  }
  public getFakeData(): Observable<Orden[]> {
    return this.http.get<Orden[]>('http://localhost:3000/ordenes')
      .pipe(
        tap((ordenes) => {
          this.lista = ordenes;
        })
      );
  }
  public uploadFakeData(): Observable<Orden> {
    const index = this.lista.findIndex((item) => item.id === this.datosOrd.id);
    const newOrden: Orden = { ...this.datosOrd };
    if (index !== -1) {
      // Si existe, actualiza el elemento en la posición index
      alert('Ya tienes uno con esa orden. Actualizando...');
      this.lista[index] = newOrden;
      return this.http.patch<Orden>(`http://localhost:3000/ordenes/${this.lista[index].id}`, this.lista[index]);
    } else {
      // Si no existe, agrega el nuevo elemento
      alert('No existe. Agregando...');
      return this.http.post<Orden>('http://localhost:3000/ordenes', newOrden);
    }
  }
  
  public deleteFakeData(id: string):Observable<Orden> {
    const index = this.lista.findIndex(item => item.id === id);
    this.lista[index].Activo = false;
    return this.http.patch<Orden>(`http://localhost:3000/ordenes/${this.lista[index].id}`, this.lista[index])
  }
  public getProdData(id: string) {
    const num = this.lista.findIndex(item => item.id === id);
    if (num !== -1) {
      this.datosOrd = { ...this.lista[num] };
    }
  }
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(localStorage.getItem('inicio') || 'null');
    return valor !== null ? valor : null;
  }
}
