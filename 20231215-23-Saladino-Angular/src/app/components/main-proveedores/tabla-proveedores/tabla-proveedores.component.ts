import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';

@Component({
  selector: 'app-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
  styleUrls: ['./tabla-proveedores.component.css'],
})
export class TablaProveedoresComponent implements OnInit {
  constructor(public service: ProveedoresService) {}
  proveedores: Proveedor[] = [];
  userState: any;

  ngOnInit(): void {
    this.actualizarListaProveedores();
    this.userState = this.service.getUserState();
  }
  //Funcion para hacer un borrado logico del proveedor
  borrarProveedor(idProv: string) {
    if (confirm('¿Estas seguro que deseas eliminar el proveedor ' + idProv + '?')) {
      this.service.deleteFakeData(idProv).subscribe((data) => {
        console.log('Se elimino el proveedor' + data);
      });
      alert('El proveedor ' + idProv + ' ha sido eliminado correctamente!');
      this.actualizarListaProveedores();
    } else {
      alert('El proveedor ' + idProv + ' no ha sido eliminado');
    }
  }
  //Funcion obtener constantemente los proveedores
  actualizarListaProveedores() {
    this.service.getFakeData().subscribe((data: Proveedor[]) => {
      this.proveedores = data;
      // Filtramos por los que estan activos
      this.proveedores = this.proveedores.filter(
        (item: Proveedor) => item.Activo === true
      );
    });
  }
  //Funcion para poner otra imagen si sale error
  handleImageError(proveedor: any) {
    proveedor.Imagen = '../../../../assets/img/logoGenerico.png';
  }
}
