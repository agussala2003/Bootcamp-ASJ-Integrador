import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';

@Component({
  selector: 'app-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
  styleUrls: ['./tabla-proveedores.component.css'],
})
export class TablaProveedoresComponent implements OnInit {
  constructor(private proveedoresService: ProveedoresService) {}

  proveedores: Proveedor[] = [];
  userState: any;
  
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

  ngOnInit(): void {
    this.userState = this.proveedoresService.getUserState();
    this.actualizarListaProveedores();
  }

  borrarProveedor(idProv: string) {
    this.proveedoresService.deleteFakeData(idProv)
      .pipe().subscribe(
        (data) => {
          console.log('Se eliminó el proveedor: ' + data);
          this.actualizarListaProveedores();
        }
      );
  }

  actualizarListaProveedores() {
    this.proveedoresService.getFakeData()
      .pipe().subscribe(
        (data: Proveedor[]) => {
          this.proveedores = data.filter((item: Proveedor) => item.Activo === true);
        }
      );
  }

  getProveedor(id: string) {
    this.proveedoresService.getProvData(id)
      .pipe().subscribe(
        (data: Proveedor) => {
          this.datosProv = data;
        }
      );
  }

  handleImageError(proveedor: any) {
    proveedor.Imagen = '../../../../assets/img/logoGenerico.png';
  }
}
