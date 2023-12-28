import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenesService } from '../../../services/ordenes.service';

@Component({
  selector: 'app-detalle-ordenes',
  templateUrl: './detalle-ordenes.component.html',
  styleUrl: './detalle-ordenes.component.css',
})
export class DetalleOrdenesComponent {
  constructor(
    public router: ActivatedRoute,
    public service: OrdenesService,
    public router2: Router
  ) {}

  idOrden: string = '';
  userState: any;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idOrden = data['idOrden'];
      this.service.getProdData(this.idOrden);
      this.userState = this.service.getUserState();
    });
  }
  // Cancelacion de orden
  borrarOrden(idOrden: string) {
    if (confirm('Estas seguro que deseas eliminar la orden ' + idOrden)) {
      this.service.deleteFakeData(idOrden).subscribe((data) => {
        console.log('Borraste' + data);
      });
      alert('La orden ' + idOrden + ' ha sido eliminado correctamente!');
      this.router2.navigate(['/ordenes']);
    } else {
      alert('La orden ' + idOrden + ' no ha sido eliminado');
    }
  }
}
