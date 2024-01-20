import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenesService } from '../../../services/ordenes.service';
import { Orden } from '../../../models/Orden';

@Component({
  selector: 'app-detalle-ordenes',
  templateUrl: './detalle-ordenes.component.html',
  styleUrls: ['./detalle-ordenes.component.css'], // Ajustado el nombre de la propiedad
})
export class DetalleOrdenesComponent implements OnInit {
  datosOrd: Orden = {
    id: '',
    Emision: '',
    Entrega: '',
    InfoRecepcion: '',
    Proveedor: '',
    Productos: [],
    Activo: true,
    Total: '',
  };

  idOrden: string = '';
  userState: any;

  constructor(
    private route: ActivatedRoute,
    private service: OrdenesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idOrden = params['idOrden'];
      this.loadOrdenData();
    });
    this.userState = this.service.getUserState();
  }

  loadOrdenData(): void {
    this.service.getProdData(this.idOrden).subscribe(
      (data: Orden) => (this.datosOrd = data)
    );
  }

  borrarOrden(idOrden: string): void {
    this.service.deleteFakeData(idOrden).subscribe((data) => {
      console.log(`Borraste ${data}`);
    });
    this.router.navigate(['/ordenes']);
  }
}
