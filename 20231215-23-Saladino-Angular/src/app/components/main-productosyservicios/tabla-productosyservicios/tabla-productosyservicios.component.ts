import { Component, OnInit } from '@angular/core';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';

@Component({
  selector: 'app-tabla-productosyservicios',
  templateUrl: './tabla-productosyservicios.component.html',
  styleUrl: './tabla-productosyservicios.component.css',
})
export class TablaProductosyserviciosComponent implements OnInit {
  constructor(public service: ProductosyserviciosService,public serviceProveedor: ProveedoresService) {}
  productosyServicios: ProductoyServicio[] = [];
  userState:any;
  proveedores: Proveedor[] = [];

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
    // Obtener datos falsos
    this.productosyServicios = this.service.getFakeData();
    this.proveedores = this.serviceProveedor.getFakeData();
    this.productosyServicios = this.productosyServicios.filter((producto: ProductoyServicio) => producto.Activo);
    // Filtramos para que no nos muestre productos que tengan a sus proveedores inactivos
    const proveedoresInactivos = this.proveedores.filter((proveedor: Proveedor) => !proveedor.Activo);
    if (proveedoresInactivos.length > 0) {
      for (let i = 0; i < proveedoresInactivos.length; i++) {
          const razonSocialProveedorInactivo = proveedoresInactivos[i].RazonSocial;
          this.productosyServicios = this.productosyServicios.filter((producto: ProductoyServicio) => {
              return producto.Proveedor !== razonSocialProveedorInactivo;
          });
      }
  }
}
  handleImageError(productoyservicio:any) {
    productoyservicio.Imagen = '../../../../assets/img/logoGenerico.png'
  }
}
