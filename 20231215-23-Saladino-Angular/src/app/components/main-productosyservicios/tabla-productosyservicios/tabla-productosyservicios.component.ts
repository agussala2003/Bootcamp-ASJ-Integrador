import { Component, OnInit } from '@angular/core';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';

@Component({
  selector: 'app-tabla-productosyservicios',
  templateUrl: './tabla-productosyservicios.component.html',
  styleUrl: './tabla-productosyservicios.component.css',
})
export class TablaProductosyserviciosComponent implements OnInit {
  constructor(public service: ProductosyserviciosService) {}
  productosyServicios: ProductoyServicio[] = [];
  userState:any;

  ngOnInit(): void {
    this.actualizarListaProductoyServicios();
    this.userState = this.service.getUserState();
  }
  borrarProductoyservicio(idProd:string) {
    if(confirm('Estas seguro que deseas eliminar el producto ' + idProd)) {
      this.service.deleteFakeData(idProd);
      alert('El producto ' + idProd + ' ha sido eliminado correctamente!')
      this.actualizarListaProductoyServicios();
    } else {
      alert('El producto ' + idProd + ' no ha sido eliminado')
    }
  }
  actualizarListaProductoyServicios() {
    this.productosyServicios = this.service.getFakeData();
  }
  handleImageError(productoyservicio:any) {
    productoyservicio.Imagen = '../../../../assets/img/logoGenerico.png'
  }
}
