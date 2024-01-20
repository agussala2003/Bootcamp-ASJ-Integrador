import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'], // Arreglado el nombre del atributo
})
export class DetalleComponent implements OnInit {
  idProv: string = '';
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

  constructor(
    public router: ActivatedRoute,
    public service: ProveedoresService,
    public router2: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProv = data['idProv'];
      this.loadProveedorData();
    });
    this.userState = this.service.getUserState();
  }

  loadProveedorData(): void {
    this.service.getProvData(this.idProv).subscribe(
      (data: Proveedor) => (this.datosProv = data)
    );
  }

  borrarProveedor(idProv: string): void {
    this.service.deleteFakeData(idProv).subscribe(
      () => {
        console.log('Se eliminó el proveedor correctamente');
        this.router2.navigate(['/proveedores']);
      }
    );
  }
}
