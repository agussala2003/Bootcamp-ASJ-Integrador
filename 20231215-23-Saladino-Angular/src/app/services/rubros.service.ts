import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rubro } from '../models/Rubro';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {
  constructor(public http:HttpClient) {}
  lista: Rubro[] = [];
  // Obtenemos todos los rubros
  public getFakeData(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>('http://localhost:3000/rubros').pipe(
      tap((rubros) => {
        this.lista = rubros;
      })
    );
  }
  // Agregar Rubro
  public uploadFakeData(rubro:Rubro): Observable<Rubro> {
    return this.http.post<Rubro>('http://localhost:3000/rubros', rubro);
  }
  // Borramos rubro
  public deleteFakeData(id:string): Observable<Rubro> {
    return this.http.delete<Rubro>(`http://localhost:3000/rubros/${id}`);
  }
  // Obtenemos el estado del usuario
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(
      localStorage.getItem('inicio') || 'null'
    );
    return valor !== null ? valor : null;
  }
}
