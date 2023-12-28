import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../../services/proveedores.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent implements OnInit {
  constructor(
    public router: ActivatedRoute,
    public service: ProveedoresService,
    public router2: Router
  ) {}
  idProv: string = '';
  userState: any;

  //Obtenenos los datos del proveedor
  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProv = data['idProv'];
      this.service.getProvData(this.idProv);
      this.userState = this.service.getUserState();
    });
  }
  //Funcion para hacer un borrado logico del proveedor
  borrarProveedor(idProv: string) {
    if (confirm('Estas seguro que deseas eliminar el proveedor ' + idProv)) {
      this.service.deleteFakeData(idProv).subscribe((data) => {
        console.log('Se elimino el proveedor' + data);
      });
      alert('El proveedor ' + idProv + ' ha sido eliminado correctamente!');
      // Navegar sin resetear la pagina
      this.router2.navigate(['/proveedores']);
    } else {
      alert('El proveedor ' + idProv + ' no ha sido eliminado');
    }
  }
}
