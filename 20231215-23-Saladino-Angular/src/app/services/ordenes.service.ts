import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../models/Orden';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdenesService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = 'http://localhost:3000/ordenes'
  lista: Orden[] = [];

  public getFakeData(): Observable<Orden[]> {
    return this.http
    .get<Orden[]>(this.baseUrl)
    .pipe(tap((ordenes) =>  (this.lista = ordenes)));
  }

  public uploadFakeData(orden: Orden): Observable<Orden> {
    const url = `${this.baseUrl}/${orden.id}`;
    const index = this.lista.findIndex((item) => item.id === orden.id);
    if (index !== -1) {
      return this.http.patch<Orden>(url,orden);
    } else {
      // Si no existe, agrega el nuevo elemento
      return this.http.post<Orden>(this.baseUrl,orden);
    }
  }

  public deleteFakeData(id: string): Observable<Orden[]> {
    const url = `${this.baseUrl}/${id}`;
    const index = this.lista.findIndex((item) => item.id === id);
    if(index !== -1) {
      this.lista[index].Activo = false;
      return this.http
      .patch<Orden>(url,this.lista[index])
      .pipe(switchMap(() => this.getFakeData()));
    }

    return of([]);
  }

  public activeOrden(id: string): Observable<Orden[]> {
    const url = `${this.baseUrl}/${id}`;
    const index = this.lista.findIndex((item) => item.id === id);
    if(index !== -1) {
      this.lista[index].Activo = true;
      return this.http
      .patch<Orden>(url,this.lista[index])
      .pipe(switchMap(() => this.getFakeData()));
    }

    return of([]);
  }
  // Obtenemos la data de una orden
  public getProdData(id: string): Observable<Orden> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Orden>(url);
  }
  // Obtenemos el estado de, usuario
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(
      localStorage.getItem('inicio') || 'null'
    );
    return valor !== null ? valor : null;
  }
}
