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
  userState:any;

  ngOnInit(): void {
    this.actualizarListaProveedores();
    this.userState = this.service.getUserState();
  }
  borrarProveedor(idProv: string) {
    if(confirm('Estas seguro que deseas eliminar el proveedor ' + idProv)) {
      this.service.deleteFakeData(idProv);
      alert('El proveedor ' + idProv + ' ha sido eliminado correctamente!')
      this.actualizarListaProveedores();
    } else {
      alert('El proveedor ' + idProv + ' no ha sido eliminado')
    }
  }
  actualizarListaProveedores() {
    this.proveedores = this.service.getFakeData();
    this.proveedores = this.proveedores.filter((item:Proveedor) => item.Activo === true);
  }
  handleImageError(proveedor:any) {
    proveedor.Imagen = '../../../../assets/img/logoGenerico.png'
  }
}
