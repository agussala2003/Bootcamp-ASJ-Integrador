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
  codProv:string = '';
  rs:string = '';
  rubro:string = '';
  telefonoProv:string = '';
  emailProv:string = '';
  sitioProv:string = '';
  calle:string = '';
  num:string = '';
  localidad:string = '';
  provincia:string = '';
  pais:string = '';
  cp:string = '';
  cuit:string = '';
  condicion:string = '';
  nombreContacto:string = '';
  apellidoContacto:string = '';
  telefonoContacto:string = '';
  emailContacto:string = '';
  rol:string = '';
  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.idProv = data['idProv'];
      console.log(this.idProv)
      if(this.idProv !== undefined) {
        const refreshProveedor: Proveedor[] = this.service.getProvData(this.idProv);
        this.codProv = refreshProveedor[0].Codigo;
        this.rs = refreshProveedor[0].RazonSocial;
        this.rubro = refreshProveedor[0].Rubro;
        this.telefonoProv = refreshProveedor[0].Telefono;
        this.emailProv = refreshProveedor[0].Email;
        this.sitioProv = refreshProveedor[0].SitioWeb;
        this.calle = refreshProveedor[0].Direccion.Calle;
        this.num = refreshProveedor[0].Direccion.Numero;
        this.localidad = refreshProveedor[0].Direccion.Localidad;
        this.provincia = refreshProveedor[0].Direccion.Provincia;
        this.pais = refreshProveedor[0].Direccion.Pais;
        this.cp = refreshProveedor[0].Direccion.CP;
        this.cuit = refreshProveedor[0].DatosFiscales.CUIT;
        this.condicion = refreshProveedor[0].DatosFiscales.CondiciónIVA;
        this.nombreContacto = refreshProveedor[0].DatosContacto.Nombre;
        this.apellidoContacto = refreshProveedor[0].DatosContacto.Apellido;
        this.telefonoContacto = refreshProveedor[0].DatosContacto.Telefono;
        this.emailContacto = refreshProveedor[0].DatosContacto.Email;
        this.rol = refreshProveedor[0].DatosContacto.Rol;
      }
    })
  }
  agregarProveedor(form:NgForm) {
    const newProveedor: Proveedor = {
      Codigo: form.value.proveedor,
      RazonSocial: form.value.razonsocial,
      Rubro: form.value.rubro,
      Telefono: form.value.telefonoProv,
      Email: form.value.emailProv,
      SitioWeb: form.value.sitioProv,
      Direccion: {
        Calle: form.value.calle,
        Numero: form.value.num,
        CP: form.value.codigopostal,
        Localidad: form.value.localidad,
        Provincia: form.value.provincia,
        Pais: form.value.pais,
      },
      DatosFiscales: {
        CUIT: form.value.cuit,
        CondiciónIVA: form.value.condicion,
      },
      DatosContacto: {
        Nombre: form.value.nombrecontacto,
        Apellido: form.value.apellidocontacto,
        Telefono: form.value.telefonocontacto,
        Email: form.value.emailcontacto,
        Rol: form.value.rol,
      },
    };
    this.service.uploadFakeData(newProveedor);
    form.reset()
  }
}