import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';

@Component({
  selector: 'app-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
  styleUrls: ['./tabla-proveedores.component.css'],
})
export class TablaProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  num: number = 0;

  constructor(public servicio: ProveedoresService) {}

  ngOnInit(): void {
    this.actualizarListaProveedores();
  }
  borrarProveedor(idProv: string) {
    this.servicio.deleteFakeData(idProv);
    this.actualizarListaProveedores();
  }
  private actualizarListaProveedores() {
    this.proveedores = this.servicio.getFakeData();
  }
  handleImageError(proveedor:any) {
    proveedor.Imagen = '../../../../assets/img/logoGenerico.png'
  }
}
