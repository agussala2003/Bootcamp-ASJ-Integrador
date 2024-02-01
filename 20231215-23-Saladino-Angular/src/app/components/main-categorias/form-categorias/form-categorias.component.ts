import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../models/Category';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-form-categorias',
  templateUrl: './form-categorias.component.html',
  styleUrl: './form-categorias.component.css',
})
export class FormCategoriasComponent implements OnInit {
  constructor(
    private categoryService: CategoriasService,
    private alertService: AlertsService,
    private router: Router,
    private router2: ActivatedRoute
  ) {}

  userState: any;
  categories: Category[] = [];
  idCategory: string = '';

  categoryViewModel: Category = {
    id: '',
    categoryName: '',
    active: true,
    createdAt: '',
    updatedAt: '',
  };

  ngOnInit(): void {
    this.router2.params.subscribe((params) => {
      this.idCategory = params['idCategory'];
      console.log(this.idCategory);
      if (this.idCategory != undefined) {
        this.getIndustryById(this.idCategory);
      }
    });
    this.userState = this.categoryService.getUserState();
  }

  getIndustryById(id: string) {
    this.categoryService.getCategoryById(id).subscribe(
      (data: Category) => {
        console.log('You get Category By id');
        console.log(data);
        this.categoryViewModel = data;
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al cargar la categoria');
      }
    );
  }

  postCategory(form: NgForm) {
    if (this.idCategory === undefined) {
      this.createCategory(this.categoryViewModel);
    } else {
      this.putCategory(this.categoryViewModel);
    }
  }

  createCategory(category: Category) {
    this.categoryService.postCategory(category).subscribe(
      (data: Category) => {
        console.log('You posted a Category');
        console.log(data);
        this.alertService.successNotification('Categoria creada');
        this.router.navigate(['/categorias']);
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al crear la categoria');
      }
    );
  }

  putCategory(category: Category) {
    this.categoryService.putCategory(category).subscribe(
      (data: Category) => {
        console.log('You putted a Category');
        console.log(data);
        this.alertService.successNotification('Categoria actualizada');
        this.router.navigate(['/categorias']);
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al actualizar la categoria');
      }
    );
  }
}
