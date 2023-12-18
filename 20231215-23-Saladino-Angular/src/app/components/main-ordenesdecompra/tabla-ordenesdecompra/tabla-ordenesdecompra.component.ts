import { Component, OnInit } from '@angular/core';
import { Orden } from '../../../models/Orden';
import { OrdenesService } from '../../../services/ordenes.service';

@Component({
  selector: 'app-tabla-ordenesdecompra',
  templateUrl: './tabla-ordenesdecompra.component.html',
  styleUrl: './tabla-ordenesdecompra.component.css',
})
export class TablaOrdenesdecompraComponent implements OnInit {
  ordenes: Orden[] = [];
  constructor(public servicio: OrdenesService) {}
  ngOnInit(): void {
    this.ordenes = this.servicio.getFakeData();
  }
  borrarOrden(idOrden:string) {
    this.ordenes = this.servicio.deleteFakeData(parseInt(idOrden))
  }
}
