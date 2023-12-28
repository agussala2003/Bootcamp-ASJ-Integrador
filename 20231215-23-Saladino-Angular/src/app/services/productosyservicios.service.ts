import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoyServicio } from '../models/ProductoyServicio';
// import { productosyServicios } from '../../data/productosyservicios';
import { Observable, of, switchMap, tap } from 'rxjs';
// const data:ProductoyServicio[] = productosyServicios;
@Injectable({
  providedIn: 'root',
})
export class ProductosyserviciosService {
  constructor(private http: HttpClient) {}
  lista:ProductoyServicio[] = [];
  datosProd: ProductoyServicio = {
    Proveedor: '',
    id: '',
    Categoria: '',
    Producto: '',
    Descripcion: '',
    Precio: '',
    Imagen: '',
    Activo:true
  }
  public getFakeData(): Observable<ProductoyServicio[]> {
    return this.http.get<ProductoyServicio[]>('http://localhost:3000/productos')
      .pipe(
        tap((productos) => {
          this.lista = productos;
        })
      );
  }
  
  public uploadFakeData(): Observable<ProductoyServicio> {
    const index = this.lista.findIndex((item) => item.id === this.datosProd.id);
    const newProd: ProductoyServicio = { ...this.datosProd };
    if (index !== -1) {
      // Si existe, actualiza el elemento en la posición index
      alert('Ya tienes uno con ese sku. Actualizando...');
      this.lista[index] = newProd;
      return this.http.patch<ProductoyServicio>(`http://localhost:3000/productos/${this.lista[index].id}`, this.lista[index]);
    } else {
      // Si no existe, agrega el nuevo elemento
      alert('No existe. Agregando...');
      return this.http.post<ProductoyServicio>('http://localhost:3000/productos', newProd);
    }
  }
  
  public deleteFakeData(id: string): Observable<ProductoyServicio[]> {
    const index = this.lista.findIndex(item => item.id === id);
    if (index !== -1) {
      this.lista[index].Activo = false;
      // Hacer el patch y luego actualizar la lista después de la operación
      return this.http.patch<ProductoyServicio>(`http://localhost:3000/productos/${this.lista[index].id}`, this.lista[index])
        .pipe(
          switchMap(() => this.getFakeData()) // Vuelve a cargar la lista después de la operación
        );
    }
    return of([]); // En caso de que el índice no se encuentre
  }
  
  public getProdData(id: string) {
    const num = this.lista.findIndex(item => item.id === id);
    if (num !== -1) {
      this.datosProd = { ...this.lista[num] };
    }
  }
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(localStorage.getItem('inicio') || 'null');
    return valor !== null ? valor : null;
  }
}
