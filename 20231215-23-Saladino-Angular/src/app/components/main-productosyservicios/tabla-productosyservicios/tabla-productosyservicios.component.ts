import { Component, OnInit } from '@angular/core';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tabla-productosyservicios',
  templateUrl: './tabla-productosyservicios.component.html',
  styleUrl: './tabla-productosyservicios.component.css',
})
export class TablaProductosyserviciosComponent implements OnInit {
  constructor(
    public service: ProductosyserviciosService,
    public serviceProveedor: ProveedoresService
  ) {}
  productosyServicios: ProductoyServicio[] = [];
  userState: any;
  proveedores: Proveedor[] = [];

  ngOnInit(): void {
    this.actualizarListaProductoyServicios();
    this.userState = this.service.getUserState();
  }
  // Borramos un producto o servicio
  borrarProductoyservicio(idProd: string) {
    if (confirm('¿Estás seguro de que deseas eliminar el producto ' + idProd + '?')) {
      this.service.deleteFakeData(idProd).subscribe(
        () => {
          console.log(idProd);
          alert('El producto ' + idProd + ' ha sido eliminado correctamente!');
          this.actualizarListaProductoyServicios();
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    } else {
      alert('El producto ' + idProd + ' no ha sido eliminado');
    }
  }

  // Actualizamos todos los productos
  actualizarListaProductoyServicios() {
    // Tipo de operador para agrupar observables
    forkJoin([
      this.service.getFakeData(),
      this.serviceProveedor.getFakeData(),
    ]).subscribe(([productos, proveedores]) => {
      this.productosyServicios = productos.filter(
        (producto: ProductoyServicio) => producto.Activo
      );

      // Filtramos para que no nos muestre productos que tengan a sus proveedores inactivos
      const proveedoresInactivos = proveedores.filter(
        (proveedor: Proveedor) => !proveedor.Activo
      );
      if (proveedoresInactivos.length > 0) {
        for (let i = 0; i < proveedoresInactivos.length; i++) {
          const razonSocialProveedorInactivo =
            proveedoresInactivos[i].RazonSocial;
          this.productosyServicios = this.productosyServicios.filter(
            (producto: ProductoyServicio) =>
              producto.Proveedor !== razonSocialProveedorInactivo
          );
        }
      }
    });
  }
  // Reemplazamos la imagen en caso de que de error
  handleImageError(productoyservicio: any) {
    productoyservicio.Imagen = '../../../../assets/img/logoGenerico.png';
  }
}
