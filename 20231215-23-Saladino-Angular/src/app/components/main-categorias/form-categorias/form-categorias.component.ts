import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/Categoria';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-categorias',
  templateUrl: './form-categorias.component.html',
  styleUrl: './form-categorias.component.css'
})
export class FormCategoriasComponent implements OnInit{
  constructor(public service: CategoriasService,public router:Router){}
  userState:any
  categoriasFull: Categoria[] = [];
  categorias:Categoria = {
    id: '',
    categoria: ''
  };
  ngOnInit(): void {
    this.userState = this.service.getUserState();
    this.service.getFakeData().subscribe((data: Categoria[]) => {
      this.categoriasFull = data;
    });
  }
  // Agregamos Categoria
  agregarCategoria(form:NgForm) {
    const highestId = this.categoriasFull.reduce((maxId, item) => {
      const currentId = parseInt(item.id);
      return currentId > maxId ? currentId : maxId;
    }, 0);
    this.categorias.id = String(highestId + 1);
    this.service.uploadFakeData(this.categorias).subscribe(data => console.log(data));
    this.router.navigate(['/categorias']);
  }
}
