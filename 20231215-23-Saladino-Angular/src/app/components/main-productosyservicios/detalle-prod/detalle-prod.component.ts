import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';

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

  idProdServ: string = '';
  userState: any;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProdServ = data['idProdServ'];
      this.service.getProdData(this.idProdServ);
      this.userState = this.service.getUserState();
    });
  }
  // Borramos el producto desde el detalle
  borrarProductoyservicio(idProd: string) {
    this.service.deleteFakeData(idProd).subscribe(
      () => {
        console.log(idProd);
        this.router2.navigate(['/productos-servicios']);
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
}
