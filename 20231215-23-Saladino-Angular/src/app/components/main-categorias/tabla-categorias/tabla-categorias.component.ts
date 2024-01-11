import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/Categoria';

@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrl: './tabla-categorias.component.css'
})
export class TablaCategoriasComponent implements OnInit{
  constructor(public service: CategoriasService){}
  categorias: Categoria[] = [];
  categoria: Categoria = {
    id: '',
    categoria: ''
  };
  userState:any;
  ngOnInit(): void {
    this.userState = this.service.getUserState();
    this.actualizarListaCategorias();
  }
  // Actualizamos el array de categorias
  actualizarListaCategorias() {
    this.service.getFakeData().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }
  // Borramos categoria y actualizamos
  borrarCategoria(id:string) {
    this.service.deleteFakeData(id).subscribe(data => {
      console.log(data)
    })
    this.actualizarListaCategorias();
  }
  // Obtenemos la categoria
  obtenerCategoria(id: string | undefined) {
    const arr = this.categorias.find((item: Categoria) => item.id === id);
    if(arr !== undefined){
      this.categoria = arr
    }
  }
}
