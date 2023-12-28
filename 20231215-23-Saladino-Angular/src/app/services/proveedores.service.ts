import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { proveedores } from '../../data/proveedores';
import { Proveedor } from '../models/Proveedor';
import { Observable, tap } from 'rxjs';
// const data:Proveedor[] = proveedores;
@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  constructor(private http: HttpClient) {}
  lista: Proveedor[] = [];
  datosProv: Proveedor = {
    id: '',
    RazonSocial: '',
    Rubro: '',
    Telefono: '',
    Email: '',
    SitioWeb: '',
    Imagen: '',
    Activo: true,
    Direccion: {
      Calle: '',
      Numero: '',
      CP: '',
      Localidad: '',
      Provincia: '',
      Pais: '',
    },
    DatosFiscales: {
      CUIT: '',
      CondicionIVA: '',
    },
    DatosContacto: {
      Nombre: '',
      Apellido: '',
      Telefono: '',
      Email: '',
      Rol: '',
    },
  };
  // Obtenemos todos los proveedores
  public getFakeData(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>('http://localhost:3000/proveedores').pipe(
      tap((proveedores) => {
        this.lista = proveedores;
      })
    );
  }
  // Actualizamos los proveedores
  public uploadFakeData(): Observable<Proveedor> {
    const index = this.lista.findIndex((item) => item.id === this.datosProv.id);
    const nuevoProveedor: Proveedor = { ...this.datosProv };
    nuevoProveedor.Direccion = { ...this.datosProv.Direccion };
    nuevoProveedor.DatosFiscales = { ...this.datosProv.DatosFiscales };
    nuevoProveedor.DatosContacto = { ...this.datosProv.DatosContacto };
    if (index !== -1) {
      // Si existe, actualiza el elemento en la posición index
      this.lista[index] = nuevoProveedor;
      this.lista[index].Direccion = nuevoProveedor.Direccion;
      this.lista[index].DatosFiscales = nuevoProveedor.DatosFiscales;
      this.lista[index].DatosContacto = nuevoProveedor.DatosContacto;
      return this.http.patch<Proveedor>(
        `http://localhost:3000/proveedores/${this.lista[index].id}`,
        this.lista[index]
      );
    } else {
      // Si no existe, agrega el nuevo elemento
      return this.http.post<Proveedor>(
        'http://localhost:3000/proveedores',
        nuevoProveedor
      );
    }
  }
  // Hacemos un borrado logico
  public deleteFakeData(id: string): Observable<Proveedor> {
    const index = this.lista.findIndex((item) => item.id === id);
    this.lista[index].Activo = false;
    return this.http.patch<Proveedor>(
      `http://localhost:3000/proveedores/${this.lista[index].id}`,
      this.lista[index]
    );
  }
  // Obtenemos el proveedor unico
  public getProvData(id: string) {
    const num = this.lista.findIndex((item) => item.id === id);
    if (num !== -1) {
      this.datosProv = { ...this.lista[num] };
      this.datosProv.Direccion = { ...this.lista[num].Direccion };
      this.datosProv.DatosFiscales = { ...this.lista[num].DatosFiscales };
      this.datosProv.DatosContacto = { ...this.lista[num].DatosContacto };
    }
  }
  // Obtenemos los paises
  public getCountryData() {
    const url =
      'https://raw.githubusercontent.com/millan2993/countries/master/json/countries.json';
    return this.http.get(url);
  }
  // Obtenemos las provincias
  public getStateData() {
    const url =
      'https://raw.githubusercontent.com/millan2993/countries/master/json/states.json';
    return this.http.get(url);
  }
  // Obtenemos el estado del usuario
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(
      localStorage.getItem('inicio') || 'null'
    );
    return valor !== null ? valor : null;
  }
}
