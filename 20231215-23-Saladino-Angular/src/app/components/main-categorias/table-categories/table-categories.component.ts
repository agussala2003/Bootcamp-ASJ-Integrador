import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrl: './table-categories.component.css',
})

export class TableCategoriesComponent implements OnInit {
  
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private alertService: AlertsService
  ) {}

  categoryViewModel: Category = {
    id: '',
    categoryName: '',
    active: true,
    createdAt: '',
    updatedAt: '',
  };

  categories: Category[] = [];
  products: Product[] = [];
  userState: any;
  loaderFlag = false;

  ngOnInit(): void {
    this.userState = this.categoryService.getUserState();
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        console.log('You Get All categories');
        console.log(data);
        this.categories = data.filter((item: Category) => item.active === true);
        this.loader();
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al cargar las categorias');
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        console.log('You get all Products');
        console.log(data);
        this.products = data;
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al cargar los productos');
      }
    );
  }

  getCategoryById(id: string) {
    this.categoryService.getCategoryById(id).subscribe(
      (data: Category) => {
        console.log('You Get By id');
        console.log(data);
        this.categoryViewModel = data;
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al cargar la categoria');
      }
    );
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(
      (data: Category) => {
        console.log('You Deleted');
        console.log(data);
        this.getCategories();
        this.loader();
        this.alertService.successNotification('Categoria Eliminada');
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al eliminar');
      }
    );
  }

  searchUsedCategories(id: string) {
    let used = true;
    this.products.forEach((item: Product) => {
      if (item.category.id === id) {
        used = false;
      }
    });
    return used;
  }

  loader() {
    this.loaderFlag = true;
    setTimeout(() => {
      this.loaderFlag = false;
    }, 1000);
  }
}
