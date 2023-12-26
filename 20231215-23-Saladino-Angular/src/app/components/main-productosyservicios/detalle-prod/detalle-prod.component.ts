import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';

@Component({
  selector: 'app-detalle-prod',
  templateUrl: './detalle-prod.component.html',
  styleUrl: './detalle-prod.component.css'
})
export class DetalleProdComponent {
  constructor(public router: ActivatedRoute, public service: ProductosyserviciosService){}
  idProdServ:string = '';
  userState:any;
  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.idProdServ = data['idProdServ'];
      this.service.getProdData(this.idProdServ);
      this.userState = this.service.getUserState();
    })
  }
}
