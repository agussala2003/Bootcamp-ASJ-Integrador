import { Component, OnInit } from '@angular/core';
import { RubrosService } from '../../../services/rubros.service';
import { Rubro } from '../../../models/Rubro';

@Component({
  selector: 'app-tabla-rubros',
  templateUrl: './tabla-rubros.component.html',
  styleUrl: './tabla-rubros.component.css'
})
export class TablaRubrosComponent implements OnInit {
  constructor(public service: RubrosService){}
  rubros: Rubro[] = [];
  rubroUnico: Rubro = {
    id: '',
    rubro: ''
  };
  userState:any;
  ngOnInit(): void {
    this.userState = this.service.getUserState();
    this.actualizarListaRubros();
  }
  // Actualizamos el array de rubros
  actualizarListaRubros() {
    this.service.getFakeData().subscribe((data: Rubro[]) => {
      this.rubros = data;
    });
  }
  // Eliminamos rubro y actualizamos
  borrarRubro(id:string) {
    this.service.deleteFakeData(id).subscribe(data => {
      console.log(data)
    })
    this.actualizarListaRubros();
  }
  // Obtenemos el rubro
  obtenerRubro(id: string | undefined) {
    const arr = this.rubros.find((item: Rubro) => item.id === id);
    if(arr !== undefined){
      this.rubroUnico = arr
    }
  }
}
