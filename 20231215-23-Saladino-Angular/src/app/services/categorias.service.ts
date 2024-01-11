import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  constructor(public http:HttpClient) { }
  lista: Categoria[] = [];
  // Obtenemos todas las categorias
  public getFakeData(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:3000/categorias').pipe(
      tap((categorias) => {
        this.lista = categorias;
      })
    );
  }
  // Agregar Categoria
  public uploadFakeData(categoria:Categoria): Observable<Categoria> {
    return this.http.post<Categoria>('http://localhost:3000/categorias', categoria);
  }
  // Borramos categoria
  public deleteFakeData(id:string): Observable<Categoria> {
    return this.http.delete<Categoria>(`http://localhost:3000/categorias/${id}`);
  }
  // Obtenemos el estado del usuario
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(
      localStorage.getItem('inicio') || 'null'
    );
    return valor !== null ? valor : null;
  }
}
