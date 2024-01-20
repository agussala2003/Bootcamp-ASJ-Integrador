import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoyServicio } from '../models/ProductoyServicio';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosyserviciosService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = 'http://localhost:3000/productos';
  lista: ProductoyServicio[] = [];

  public getFakeData(): Observable<ProductoyServicio[]> {
    return this.http
      .get<ProductoyServicio[]>(this.baseUrl)
      .pipe(tap((productos) => (this.lista = productos)));
  }
  // Agregamos o actualizamos un producto
  public uploadFakeData(producto: ProductoyServicio): Observable<ProductoyServicio> {
    const url = `${this.baseUrl}/${producto.id}`;
    const index = this.lista.findIndex((item) => item.id === producto.id);
    
    if (index !== -1) {
      return this.http.patch<ProductoyServicio>(url,producto);
    } else {
      // Si no existe, agrega el nuevo elemento
      return this.http.post<ProductoyServicio>(this.baseUrl,producto);
    }
  }
  public deleteFakeData(id: string): Observable<ProductoyServicio[]> {
    const url = `${this.baseUrl}/${id}`;
    const index = this.lista.findIndex((item) => item.id === id);
    
    if (index !== -1) {
      this.lista[index].Activo = false;
      return this.http
        .patch<ProductoyServicio>(url, this.lista[index])
        .pipe(switchMap(() => this.getFakeData()));
    }

    return of([]);
  }

  public getProdData(id: string): Observable<ProductoyServicio> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ProductoyServicio>(url);
  }

  getUserState(): string | null {
    const valor: string | null = JSON.parse(
      localStorage.getItem('inicio') || 'null'
    );
    return valor !== null ? valor : null;
  }
}
