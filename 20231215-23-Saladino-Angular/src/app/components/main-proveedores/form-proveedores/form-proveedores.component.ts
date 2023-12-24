import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form-proveedores.component.html',
  styleUrl: './form-proveedores.component.css',
})
export class FormProveedoresComponent implements OnInit {
  constructor(public service: ProveedoresService,public router: ActivatedRoute) {}
  idProv:string = '';
  paises:any[] = [];
  provincias:any[] = [];
  userState:any;
  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.idProv = data['idProv'];
      if(this.idProv !== undefined) {
        this.service.getProvData(this.idProv);
        alert('Vas a editar el proveedor ' + this.idProv)
      } else {
        resetearLista(this.service.datosProv);
      }
    })
    this.service.getCountryData().subscribe((data:any) => {
      this.paises = data.countries
    })
    this.userState = this.service.getUserState();
  }
  buscarPais(pais:string) {
    this.service.getStateData().subscribe((data:any) => {
      const idPais = this.paises.find(item => item.name === pais).id
      if(idPais != null) {
        this.provincias = data.states.filter((item:any) => item.id_country === idPais)
      }
    })
  }
  agregarProveedor(form:NgForm) {
    this.service.uploadFakeData();
    form.reset()
  }
}
function resetearLista (lista: Proveedor) {
  lista.Codigo = '';
  lista.RazonSocial = '';
  lista.Rubro = '';
  lista.Telefono = '';
  lista.Email = '';
  lista.SitioWeb = '';
  lista.Imagen = '';
  lista.Direccion.Calle = '';
  lista.Direccion.Numero = '';
  lista.Direccion.CP = '';
  lista.Direccion.Localidad = '';
  lista.Direccion.Provincia = '';
  lista.Direccion.Pais = '';
  lista.DatosFiscales.CUIT = '';
  lista.DatosFiscales.CondicionIVA = '';
  lista.DatosContacto.Nombre = '';
  lista.DatosContacto.Apellido = '';
  lista.DatosContacto.Telefono = '';
  lista.DatosContacto.Email = '';
  lista.DatosContacto.Rol = '';
}