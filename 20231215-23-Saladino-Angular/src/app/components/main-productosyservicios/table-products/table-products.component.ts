import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { Category } from '../../../models/Category';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { CategoryService } from '../../../services/category.service';
import { AlertsService } from '../../../services/alerts.service';
import { SearchPipe } from '../../../pipes/search.pipe';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css'],
})

export class TableProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private loginService: LoginService,
    private alertService: AlertsService
  ) {}

  industryViewModel: Industry = { id: '', industryName: '', active: true };
  ivaConditionViewModel: IvaCondition = { id: '', taxCondition: '' };
  supplierViewModel: Supplier = {
    id: '',
    supplierCode: '',
    businessName: '',
    active: true,
    cuit: '',
    email: '',
    image: '',
    phoneNumber: '',
    website: '',
    industry: this.industryViewModel,
    ivaCondition: this.ivaConditionViewModel,
    createdAt: '',
    updatedAt: '',
  };

  categoryViewModel: Category = {
    id: '',
    categoryName: '',
    active: true,
    createdAt: '',
    updatedAt: '',
  };

  productViewModel: Product = {
    id: '',
    sku: '',
    productName: '',
    description: '',
    imageUrl: '',
    active: true,
    price: 0,
    createdAt: '',
    updatedAt: '',
    supplier: this.supplierViewModel,
    category: this.categoryViewModel,
  };

  products: Product[] = [];
  categories: Category[] = [];
  initActiveProducts: Product[] = [];
  initDeletedProducts: Product[] = [];
  userState: any;
  productFilter: string = '';
  categoryFilter: string = '0';
  priceFilter: string = '0';
  prevPage: number = 0;
  nextPage: number = 5;
  isActiveItems: boolean = true;
  loaderFlag = false;
  deletedLength: number = 0;
  productLength: number = 0;

  ngOnInit(): void {
    this.getActiveProducts();
    this.getCategories();
    this.getDeletedLength();
    this.userState = this.loginService.getUserState();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        console.log('You get Categories');
        console.log(data);
        this.categories = data.filter((item: Category) => item.active === true);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener las categorias');
      }
    );
  }

  getDeletedLength() {
    this.productService.getDeletedProducts().subscribe(
      (data: Product[]) => {
        console.log('You get deleted products');
        console.log(data);
        this.deletedLength = data.length;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los productos');
      }
    );
  }
  
  getActiveProducts(): void {
    this.productService.getActiveProducts().subscribe(
      (data: Product[]) => {
        console.log('You get active products');
        console.log(data);
        this.loader();
        this.priceFilter = '0';
        this.categoryFilter = '0';
        this.products = data;
        this.initActiveProducts = data;
        this.productLength = data.length;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los productos');
      }
    );
  }

  getDeletedProducts(): void {
    this.productService.getDeletedProducts().subscribe(
      (data: Product[]) => {
        console.log('You get deleted products');
        console.log(data);
        this.loader();
        this.priceFilter = '0';
        this.categoryFilter = '0';
        this.initDeletedProducts = data;
        this.products = data;
        this.productLength = data.length;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los productos');
      }
    );
  }

  getProductsByPriceAsc(): void {
    this.productService.getProductsByPriceAsc().subscribe(
      (data: Product[]) => {
        console.log('You get products by price asc');
        console.log(data);
        this.loader();
        this.products = data.filter(
          (item: Product) => item.active === this.isActiveItems
        );
        this.productLength = this.products.length;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los productos');
      }
    );
  }

  getProductsByPriceDesc(): void {
    this.productService.getProductsByPriceDesc().subscribe(
      (data: Product[]) => {
        console.log('You get products by price desc');
        console.log(data);
        this.loader();
        this.products = data.filter(
          (item: Product) => item.active === this.isActiveItems
        );
        this.productLength = this.products.length;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los productos');
      }
    );
  }

  getProductByCategory(categoryId: string): void {
    this.productService.getProductsByCategory(categoryId).subscribe(
      (data: Product[]) => {
        console.log('You get products by category');
        console.log(data);
        this.loader();
        this.products = data.filter(
          (item: Product) => item.active === this.isActiveItems
          );
        this.productLength = this.products.length;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los productos');
      }
    );
  }

  checkSupplier(product: Product): boolean {
    return product.supplier.active;
  }

  deleteProduct(id: string, productName: string): void {
    Swal.fire({
      title: `Estas seguro que quieres borrar el producto ${productName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, borralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(
          (data: Product) => {
            console.log('You deleted a product');
            console.log(data);
            this.getActiveProducts();
            this.getDeletedLength();
            this.priceFilter = '0';
            this.categoryFilter = '0';
            this.productFilter = '';
            this.alertService.successNotification('Producto eliminado');
            this.loader();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al eliminar el producto');
          }
        );
      }
    });
  }

  undeleteProduct(id: string, productName: string): void {
    Swal.fire({
      title: `Estas seguro que quieres reactivar el producto ${productName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, activalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.patchProduct(id).subscribe(
          (data: Product) => {
            console.log('You undeleted a product');
            console.log(data);
            this.isActiveItems = !this.isActiveItems;
            this.getActiveProducts();
            this.getDeletedLength();
            this.priceFilter = '0';
            this.categoryFilter = '0';
            this.productFilter = '';
            this.alertService.successNotification('Producto reactivado');
            this.loader();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al reactivar el producto');
          }
        );
      }
    });
  }

  onPriceFilterChange() {
    if (this.priceFilter === '0') {
      this.getProductsByPriceAsc();
      this.resetPages();
      this.priceFilter = '1';
      this.categoryFilter = '0';
      this.productFilter = '';
    } else if (this.priceFilter === '1') {
      this.getProductsByPriceDesc();
      this.resetPages();;
      this.priceFilter = '2';
      this.categoryFilter = '0';
      this.productFilter = '';
    } else if (this.priceFilter === '2') {
      this.priceFilter = '0';
      this.categoryFilter = '0';
      this.productFilter = '';
      if (this.isActiveItems) {
        this.getActiveProducts();
        this.resetPages();
      } else {
        this.getDeletedProducts();
        this.resetPages();
      }
    }
  }

  onCategoryFilterChange() {
    if (this.categoryFilter === '0') {
      if (this.isActiveItems) {
        this.getActiveProducts();
        this.resetPages();
      } else {
        this.getDeletedProducts();
        this.resetPages();
      }
    } else {
      this.resetPages();
      this.getProductByCategory(this.categoryFilter);
      this.priceFilter = '0';
      this.productFilter = '';
    }
  }

  resetPages() {
    this.prevPage = 0;
    this.nextPage = 5;
  }

  onFilterChange() {
    this.resetPages();
    if(this.productFilter === '' ){
      if(this.isActiveItems)
        this.getActiveProducts()
      else
        this.getDeletedProducts()
    } else {
      this.categoryFilter = '0';
      this.priceFilter = '0';
      if(this.isActiveItems) {
        const filterActive = new SearchPipe().transform(this.initActiveProducts, this.productFilter);
        this.products = filterActive.filteredData;
        this.productLength = filterActive.filteredDataLength;
      } else {
        const filterDeleted = new SearchPipe().transform(this.initDeletedProducts, this.productFilter);
        this.products = filterDeleted.filteredData;
        this.productLength = filterDeleted.filteredDataLength;
      }
    }
  }

  loader() {
    this.loaderFlag = true;
    setTimeout(() => {
      this.loaderFlag = false;
    }, 1000);
  }

  handleImageError(productoyservicio: any): void {
    productoyservicio.Imagen = '../../../../assets/img/logoGenerico.png';
  }

  goPrevPage() {
    if (this.prevPage >= 5) {
      this.prevPage -= 5;
      this.nextPage -= 5;
    }
  }

  goNextPage() {
    this.prevPage += 5;
    this.nextPage += 5;
  }

  changeState() {
    this.isActiveItems = !this.isActiveItems;
    if (this.isActiveItems) {
      this.resetPages();
      this.priceFilter = '0';
      this.categoryFilter = '0';
      this.productFilter = '';
      this.getActiveProducts();
    } else {
      this.getDeletedProducts();
      this.priceFilter = '0';
      this.categoryFilter = '0';
      this.productFilter = '';
      this.resetPages();
    }
  }
}
