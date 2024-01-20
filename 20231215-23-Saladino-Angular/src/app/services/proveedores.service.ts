import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Proveedor } from '../models/Proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  private baseUrl = 'http://localhost:3000/proveedores';
  lista: Proveedor[] = [];

  constructor(private http: HttpClient) {}

  getFakeData(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.baseUrl).pipe(
      tap((proveedores) => {
        this.lista = proveedores;
      })
    );
  }

  uploadFakeData(proveedor: Proveedor): Observable<Proveedor> {
    const url = `${this.baseUrl}/${proveedor.id}`;
    const index = this.lista.findIndex((item) => item.id === proveedor.id);

    if (index !== -1) {
      return this.http.patch<Proveedor>(url, proveedor);
    } else {
      return this.http.post<Proveedor>(this.baseUrl, proveedor);
    }
  }

  deleteFakeData(id: string): Observable<Proveedor> {
    const url = `${this.baseUrl}/${id}`;
    const index = this.lista.findIndex((item) => item.id === id);
  
    if (index !== -1) {
      this.lista[index].Activo = false;
      return this.http.patch<Proveedor>(url, this.lista[index]);
    } else {
      // Returning an observable that represents an error
      return new Observable<Proveedor>((observer) => {
        observer.error('Proveedor no encontrado');
      });
    }
  }
  

  getProvData(id: string): Observable<Proveedor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Proveedor>(url);
  }

  getCountryData(): Observable<any> {
    const url =
      'https://raw.githubusercontent.com/millan2993/countries/master/json/countries.json';
    return this.http.get(url);
  }

  getStateData(): Observable<any> {
    const url =
      'https://raw.githubusercontent.com/millan2993/countries/master/json/states.json';
    return this.http.get(url);
  }

  getUserState(): string | null {
    const valor: string | null = JSON.parse(
      localStorage.getItem('inicio') || 'null'
    );
    return valor !== null ? valor : null;
  }
}
