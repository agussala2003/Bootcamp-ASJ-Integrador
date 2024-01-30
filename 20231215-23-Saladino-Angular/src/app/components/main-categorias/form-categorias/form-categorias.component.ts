import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../../models/Category';

@Component({
  selector: 'app-form-categorias',
  templateUrl: './form-categorias.component.html',
  styleUrl: './form-categorias.component.css'
})
export class FormCategoriasComponent implements OnInit{
  constructor(public categoryService: CategoriasService,public router:Router){}
  userState:any

  categories: Category[] = [];

  categoryViewModel: Category = {
    id: '',
    categoryName: '',
    createdAt: '',
    updatedAt: ''
  };

  ngOnInit(): void {
    this.userState = this.categoryService.getUserState();
  }


  // Agregamos Categoria
  postCategory(form:NgForm) {
    this.categoryService.postCategory(this.categoryViewModel).subscribe((data: Category) => {
      console.log("You posted a Category");
      console.log(data);
    })
    this.router.navigate(['/categorias']);
  }
}
