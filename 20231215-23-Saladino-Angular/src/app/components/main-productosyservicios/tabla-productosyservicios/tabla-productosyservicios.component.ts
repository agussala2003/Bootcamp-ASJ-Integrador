import { Component, OnInit } from '@angular/core';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProveedoresService } from '../../../services/proveedores.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';

@Component({
  selector: 'app-tabla-productosyservicios',
  templateUrl: './tabla-productosyservicios.component.html',
  styleUrls: ['./tabla-productosyservicios.component.css'],
})
export class TablaProductosyserviciosComponent implements OnInit {
  datosProd: ProductoyServicio = {
    Proveedor: '',
    id: '',
    Categoria: '',
    Producto: '',
    Descripcion: '',
    Precio: '',
    Imagen: '',
    Activo: true,
  };

  productosyServicios: ProductoyServicio[] = [];
  userState: any;

  constructor(
    public productosService: ProductosyserviciosService,
    private proveedoresService: ProveedoresService
  ) {}

  ngOnInit(): void {
    this.actualizarListaProductoyServicios();
    this.userState = this.productosService.getUserState();
  }

  borrarProductoyservicio(idProd: string): void {
    this.productosService.deleteFakeData(idProd).subscribe(() => {
      console.log(idProd);
      this.actualizarListaProductoyServicios();
    });
  }

  getProducto(id:string) {
    this.productosService.getProdData(id).subscribe((data:ProductoyServicio) => {
      this.datosProd = data;
    })
  }

  actualizarListaProductoyServicios(): void {
    forkJoin([this.productosService.getFakeData(), this.proveedoresService.getFakeData()])
      .pipe()
      .subscribe(([productos, proveedores]) => {
        this.productosyServicios = this.filtrarProductosActivos(productos);
        this.productosyServicios = this.filtrarProveedoresInactivos(
          this.productosyServicios,
          proveedores
        );
      });
  }

  handleImageError(productoyservicio: any): void {
    productoyservicio.Imagen = '../../../../assets/img/logoGenerico.png';
  }

  private filtrarProductosActivos(productos: ProductoyServicio[]): ProductoyServicio[] {
    return productos.filter((producto) => producto.Activo);
  }

  private filtrarProveedoresInactivos(
    productos: ProductoyServicio[],
    proveedores: any[]
  ): ProductoyServicio[] {
    const proveedoresInactivos = proveedores.filter((proveedor) => !proveedor.Activo);

    if (proveedoresInactivos.length > 0) {
      proveedoresInactivos.forEach((proveedor) => {
        const razonSocialProveedorInactivo = proveedor.RazonSocial;
        productos = productos.filter(
          (producto) => producto.Proveedor !== razonSocialProveedorInactivo
        );
      });
    }

    return productos;
  }
}
