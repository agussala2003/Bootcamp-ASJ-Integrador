import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../../services/proveedores.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit{
  constructor(public router: ActivatedRoute, public service: ProveedoresService){}
  idProv:string = '';
  userState:any;
  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.idProv = data['idProv'];
      this.service.getProvData(this.idProv);
      this.userState = this.service.getUserState();
    })
  }
}
