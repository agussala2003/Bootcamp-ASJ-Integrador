import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { Category } from '../../../models/Category';
import { ProductService } from '../../../services/productosyservicios.service';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrl: './tabla-categorias.component.css'
})
export class TablaCategoriasComponent implements OnInit{
  constructor(private categoryService: CategoriasService, private productService: ProductService){}

  categories: Category[] = [];
  products: Product[] = [];

  categoryViewModel: Category = {
    id: '',
    categoryName: '',
    active: true,
    createdAt: '',
    updatedAt: ''
  };

  userState:any;
  loaderFlag = false;

  ngOnInit(): void {
    this.userState = this.categoryService.getUserState();
    this.refreshCategories();
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      console.log("You get all Products");
      console.log(data);
      this.products = data;
    });
  }

  refreshCategories() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      console.log("You Get All categories")
      console.log(data);
      this.categories = data.filter((item: Category) => item.active === true);
      this.loader();
    });
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

  
  deleteCategory(id:string) {
    this.categoryService.deleteCategory(id).subscribe((data: Category) => {
      console.log("You Deleted")
      console.log(data)
      this.refreshCategories();
      this.loader();
    })
  }

  loader() {
    this.loaderFlag = true;
    setTimeout(() => {
      this.loaderFlag = false;
    }, 1000);
  }

  getCategoryById(id: string) {
    this.categoryService.getCategoryById(id).subscribe((data: Category) => {
      console.log("You Get By id");
      console.log(data);
      this.categoryViewModel = data;
    })
  }
}
