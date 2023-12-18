import { Component } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';

@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form-proveedores.component.html',
  styleUrl: './form-proveedores.component.css',
})
export class FormProveedoresComponent {
  codProv = '';
  rs = '';
  rubro = '';
  contactoProv = '';
  calleynum = '';
  localidad = '';
  provincia = '';
  pais = '';
  cp = '';
  cuit = '';
  condicion = '';
  nombreContacto = '';
  apellidoContacto = '';
  telefonoContacto = '';
  emailContacto = '';
  rol = '';
  agregarProveedor() {
    const newProveedor: Proveedor = {
      Codigo: this.codProv,
      RazonSocial: this.rs,
      Rubro: this.rubro,
      Contacto: this.contactoProv,
      Direccion: {
        CalleyN: this.calleynum,
        CP: this.cp,
        Localidad: this.localidad,
        Provincia: this.provincia,
        Pais: this.pais,
      },
      DatosFiscales: {
        CUIT: this.cuit,
        CondiciónIVA: this.condicion,
      },
      DatosContacto: {
        Nombre: this.nombreContacto,
        Apellido: this.apellidoContacto,
        Telefono: this.telefonoContacto,
        Email: this.emailContacto,
        Rol: this.rol,
      },
    };
    if (validarCamposCompletos(newProveedor)) {
      // Llama al servicio para agregar el proveedor
      this.service.uploadFakeData(newProveedor);
      this.codProv = '';
      this.rs = '';
      this.rubro = '';
      this.contactoProv = '';
      this.calleynum = '';
      this.localidad = '';
      this.provincia = '';
      this.pais = '';
      this.cp = '';
      this.cuit = '';
      this.condicion = '';
      this.nombreContacto = '';
      this.apellidoContacto = '';
      this.telefonoContacto = '';
      this.emailContacto = '';
      this.rol = '';
    } else {
      alert('Debes completar todos los campos');
    }
  }
  constructor(public service: ProveedoresService) {}
}

function validarCamposCompletos(proveedor: any): boolean {
  // Verifica que todos los campos requeridos estén completos
  return (
    proveedor.Codigo &&
    proveedor.RazonSocial &&
    proveedor.Rubro &&
    proveedor.Contacto &&
    proveedor.Direccion.CalleyN &&
    proveedor.Direccion.CP &&
    proveedor.Direccion.Localidad &&
    proveedor.Direccion.Provincia &&
    proveedor.Direccion.Pais &&
    proveedor.DatosFiscales.CUIT &&
    proveedor.DatosFiscales.CondiciónIVA &&
    proveedor.DatosContacto.Nombre &&
    proveedor.DatosContacto.Apellido &&
    proveedor.DatosContacto.Telefono &&
    proveedor.DatosContacto.Email &&
    proveedor.DatosContacto.Rol
  );
}
