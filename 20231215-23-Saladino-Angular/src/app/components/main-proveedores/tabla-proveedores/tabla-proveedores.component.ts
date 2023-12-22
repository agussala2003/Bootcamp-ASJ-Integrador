import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';
@Component({
  selector: 'app-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
  styleUrl: './tabla-proveedores.component.css',
})
export class TablaProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  num:number = 0;
  constructor(public servicio: ProveedoresService) {}
  ngOnInit(): void {
    this.proveedores = this.servicio.getFakeData();
  }
  borrarProveedor(idProv:string) {
    this.proveedores = this.servicio.deleteFakeData(idProv)
  }
}
