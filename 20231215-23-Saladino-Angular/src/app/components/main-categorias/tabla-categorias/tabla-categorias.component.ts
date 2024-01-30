import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { Category } from '../../../models/Category';

@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrl: './tabla-categorias.component.css'
})
export class TablaCategoriasComponent implements OnInit{
  constructor(public categoryService: CategoriasService){}

  categories: Category[] = [];

  categoryViewModel: Category = {
    id: '',
    categoryName: '',
    createdAt: '',
    updatedAt: ''
  };

  userState:any;

  ngOnInit(): void {
    this.userState = this.categoryService.getUserState();
    this.refreshCategories();
  }

  refreshCategories() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      console.log("You Get All categories")
      console.log(data);
      this.categories = data;
    });
  }
  
  deleteCategory(id:string) {
    this.categoryService.deleteCategory(id).subscribe((data: Category) => {
      console.log("You Deleted")
      console.log(data)
      this.refreshCategories();
    })
  }

  getCategoryById(id: string) {
    this.categoryService.getCategoryById(id).subscribe((data: Category) => {
      console.log("You Get By id");
      console.log(data);
      this.categoryViewModel = data;
    })
  }
}
