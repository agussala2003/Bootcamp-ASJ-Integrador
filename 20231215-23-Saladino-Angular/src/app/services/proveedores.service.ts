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
  datosProv:Proveedor = {
    Codigo: '',
    RazonSocial: '',
    Rubro: '',
    Telefono: '',
    Email: '',
    SitioWeb: '',
    Imagen: '',
    Direccion: {
      Calle: '',
      Numero: '',
      CP: '',
      Localidad: '',
      Provincia: '',
      Pais: ''
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
    }
  }
  public getFakeData() {
    return this.lista;
  }
  public uploadFakeData() {
    const index = this.lista.findIndex(item => item.Codigo === this.datosProv.Codigo);
    const nuevoProveedor: Proveedor = { ...this.datosProv }; // Crear una nueva instancia
    nuevoProveedor.Direccion = { ...this.datosProv.Direccion };
    nuevoProveedor.DatosFiscales = { ...this.datosProv.DatosFiscales };
    nuevoProveedor.DatosContacto = { ...this.datosProv.DatosContacto };
    if (index !== -1) {
      // Si existe, actualiza el elemento en la posición index
      alert('Ya tienes uno de ese proveedor. Actualizando...');
      this.lista[index] = { ...this.datosProv };
      this.lista[index].Direccion = { ...this.datosProv.Direccion };
      this.lista[index].DatosFiscales = { ...this.datosProv.DatosFiscales };
      this.lista[index].DatosContacto = { ...this.datosProv.DatosContacto };
    } else {
      // Si no existe, agrega el nuevo elemento
      alert('No existe. Agregando...');
      this.lista.push(nuevoProveedor);
    }
  }
  public deleteFakeData(id: string) {
    this.lista = this.lista.filter(item => item.Codigo !== id)
    return this.lista;
  }
  public getProvData(id: string) {
    const num = this.lista.findIndex(item => item.Codigo === id);
    if (num !== -1) {
      this.datosProv = { ...this.lista[num] };
      this.datosProv.Direccion = { ...this.lista[num].Direccion };
      this.datosProv.DatosFiscales = { ...this.lista[num].DatosFiscales };
      this.datosProv.DatosContacto = { ...this.lista[num].DatosContacto };
    }
  }
  public getCountryData() {
    const url = 'https://raw.githubusercontent.com/millan2993/countries/master/json/countries.json';
    return this.http.get(url);
  }  
  public getStateData(){
    const url = 'https://raw.githubusercontent.com/millan2993/countries/master/json/states.json'
    return this.http.get(url);
  }
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(localStorage.getItem('inicio') || 'null');
    // Si el valor es null o undefined, devuelve null
    return valor !== null ? valor : null;
  }
  
}
