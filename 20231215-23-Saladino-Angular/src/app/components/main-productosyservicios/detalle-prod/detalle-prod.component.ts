import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';
import { ProductoyServicio } from '../../../models/ProductoyServicio';

@Component({
  selector: 'app-detalle-prod',
  templateUrl: './detalle-prod.component.html',
  styleUrl: './detalle-prod.component.css',
})
export class DetalleProdComponent {
  constructor(
    public router: ActivatedRoute,
    public service: ProductosyserviciosService,
    public router2: Router
  ) {}

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

  idProdServ: string = '';
  userState: any;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProdServ = data['idProdServ'];
      this.loadProductoData();
    });
    this.userState = this.service.getUserState();
  }
  
  loadProductoData():void {
    this.service.getProdData(this.idProdServ).subscribe(
      (data: ProductoyServicio) => (this.datosProd = data)
    );
  }

  borrarProductoyservicio(idProd: string) {
    this.service.deleteFakeData(idProd).subscribe(
      () => {
        console.log(idProd);
        this.router2.navigate(['/productos-servicios']);
      }
    );
  }
}
