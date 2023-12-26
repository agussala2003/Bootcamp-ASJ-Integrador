import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenesService } from '../../../services/ordenes.service';

@Component({
  selector: 'app-detalle-ordenes',
  templateUrl: './detalle-ordenes.component.html',
  styleUrl: './detalle-ordenes.component.css'
})
export class DetalleOrdenesComponent {
  constructor(public router: ActivatedRoute, public service: OrdenesService){}
  idOrden:string = '';
  userState:any;
  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.idOrden = data['idOrden'];
      this.service.getProdData(this.idOrden);
      this.userState = this.service.getUserState();
    })
  }
}
