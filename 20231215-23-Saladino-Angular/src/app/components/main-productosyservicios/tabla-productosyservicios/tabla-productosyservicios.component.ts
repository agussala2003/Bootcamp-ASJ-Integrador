import { Component, OnInit } from '@angular/core';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';

@Component({
  selector: 'app-tabla-productosyservicios',
  templateUrl: './tabla-productosyservicios.component.html',
  styleUrl: './tabla-productosyservicios.component.css',
})
export class TablaProductosyserviciosComponent implements OnInit {
  productosyServicios: ProductoyServicio[] = [];
  constructor(public servicio: ProductosyserviciosService) {}
  ngOnInit(): void {
    this.productosyServicios = this.servicio.getFakeData();
  }
  borrarProductoyservicio(idProd:string) {
    this.productosyServicios = this.servicio.deleteFakeData(parseInt(idProd))
  }
}
