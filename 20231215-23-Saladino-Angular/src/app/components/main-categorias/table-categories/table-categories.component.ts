import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { AlertsService } from '../../../services/alerts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrl: './table-categories.component.css',
})

export class TableCategoriesComponent implements OnInit {
  
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private alertService: AlertsService,
    private modalService: NgbModal
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
  isEditedCategory = false;
  isActiveItems = true;
  deletedLength = 0;

  ngOnInit(): void {
    this.userState = this.categoryService.getUserState();
    this.getActiveCategories();
    this.getProducts();
    this.getDeletedLength();
  }

  getActiveCategories() {
    this.isActiveItems = true;
    this.categoryService.getActiveCategories().subscribe(
      (data: Category[]) => {
        console.log('You Get active Categories');
        console.log(data);
        this.categories = data;
        this.loader();
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al cargar las categorias');
      }
    );
  }

  getDeletedCategories() {
    this.categoryService.getDeletedCategories().subscribe(
      (data: Category[]) => {
        console.log('You Get deleted Categories');
        console.log(data);
        this.categories = data;
        this.loader();
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al cargar las categorias');
      }
    );
  }

  getDeletedLength() {
    this.categoryService.getDeletedCategories().subscribe(
      (data: Category[]) => {
        console.log('You Get deleted Categories');
        console.log(data);
        this.deletedLength = data.length;
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

  createCategory(category: Category) {
    Swal.fire({
      title: `Estas seguro que quieres crear la categoria ${this.categoryViewModel.categoryName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, creala!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.postCategory(category).subscribe(
          (data: Category) => {
            console.log('You posted a Category');
            console.log(data);
            this.alertService.successNotification('Categoria creada');
            this.getActiveCategories();
          },
          (error) => {
            console.error(error);
            this.alertService.errorNotification('Error al crear la categoria, puede que ya exista o no hayas realizado cambios');
          }
        );
      }
    });
  }

  putCategory(category: Category) {
    Swal.fire({
      title: `Estas seguro que quieres actualizar la categoria ${this.categoryViewModel.categoryName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, actualizala!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.putCategory(category).subscribe(
          (data: Category) => {
            console.log('You putted a Category');
            console.log(data);
            this.alertService.successNotification('Categoria actualizada');
            this.getActiveCategories();
          },
          (error) => {
            console.error(error);
            this.alertService.errorNotification('Error al actualizar la categoria, puede que ya exista o no hayas realizado cambios');
          }
        );
      }
    });
  }

  deleteCategory(id: string, categoryName: string) {
    Swal.fire({
      title: `Estas seguro que quieres borrar la categoria ${categoryName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, borrala!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(
          (data: Category) => {
            console.log('You Deleted');
            console.log(data);
            this.getActiveCategories();
            this.loader();
            this.alertService.successNotification('Categoria Eliminada');
          },
          (error) => {
            console.error(error);
            this.alertService.errorNotification('Error al eliminar');
          }
        );
      }
    });
  }

  undeleteCategory(id: string, categoryName: string) {
    Swal.fire({
      title: `Estas seguro que quieres reactivar la categoria ${categoryName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, activala!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.undeleteCategory(id).subscribe(
          (data: Category) => {
            console.log('You Undeleted');
            console.log(data);
            this.getActiveCategories();
            this.loader();
            this.alertService.successNotification('Categoria recuperada');
          },
          (error) => {
            console.error(error);
            this.alertService.errorNotification('Error al recuperar');
          }
        );
      }
    });
  }

  openModal(content: any, id?: string) {
    if(id) {
      this.isEditedCategory = true;
      this.getCategoryById(id);
    } else {
      this.isEditedCategory = false;
      this.cleanCategoryViewModel();
    }
    this.modalService.open(content, { centered: true });
  }

  closeModal() {
    if (this.isEditedCategory) {
      this.isEditedCategory = false;
      this.putCategory(this.categoryViewModel);
      this.cleanCategoryViewModel();
      this.modalService.dismissAll();
    } else {
      this.createCategory(this.categoryViewModel);
      this.cleanCategoryViewModel();
      this.modalService.dismissAll();
    }
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

  changeState() {
    this.isActiveItems = !this.isActiveItems;
    if (this.isActiveItems) {
      this.getActiveCategories();
    } else {
      this.getDeletedCategories();
    }
  }

  cleanCategoryViewModel() {
    this.categoryViewModel = {
      id: '',
      categoryName: '',
      active: true,
      createdAt: '',
      updatedAt: '',
    };
  }
}
