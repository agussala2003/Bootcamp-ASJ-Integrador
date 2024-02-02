import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { Category } from '../../../models/Category';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { CategoryService } from '../../../services/category.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css'],
})
export class TableProductsComponent implements OnInit {
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
  userState: any;
  productFilter: string = '';
  categoryFilter: string = '0';
  priceFilter: string = '0';
  prevPage: number = 0;
  nextPage: number = 5;
  isActiveItems: boolean = true;
  loaderFlag = false;
  deletedLength: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.getActiveProducts();
    this.getCategories();
    this.getDeletedLength();
    this.userState = this.productService.getUserState();
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

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        console.log('You get a product by Id');
        console.log(data);
        this.productViewModel = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener el producto');
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
        console.log('You get active products');
        console.log(data);
        this.loader();
        this.priceFilter = '0';
        this.categoryFilter = '0';
        this.products = data;
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
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los productos');
      }
    );
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      (data: Product) => {
        console.log('You deleted a product');
        console.log(data);
        this.getActiveProducts();
        this.getDeletedLength();
        this.priceFilter = '0';
        this.categoryFilter = '0';
        this.alertService.successNotification('Producto eliminado');
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al eliminar el producto');
      }
    );
  }

  undeleteProduct(id: string): void {
    this.productService.patchProduct(id).subscribe(
      (data: Product) => {
        console.log('You undeleted a product');
        console.log(data);
        this.isActiveItems = !this.isActiveItems;
        this.getActiveProducts();
        this.getDeletedLength();
        this.priceFilter = '0';
        this.categoryFilter = '0';
        this.alertService.successNotification('Producto reactivado');
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al reactivar el producto');
      }
    );
  }

  onPriceFilterChange(number: number) {
    if (this.priceFilter === '0') {
      this.getProductsByPriceAsc();
      this.priceFilter = '1';
      this.categoryFilter = '0';
    } else if (this.priceFilter === '1') {
      this.getProductsByPriceDesc();
      this.priceFilter = '2';
      this.categoryFilter = '0';
    } else if (this.priceFilter === '2') {
      this.priceFilter = '0';
      this.categoryFilter = '0';
      if (this.isActiveItems) {
        this.getActiveProducts();
      } else {
        this.getDeletedProducts();
      }
    }
  }

  onCategoryFilterChange() {
    if (this.categoryFilter === '0') {
      if (this.isActiveItems) {
        this.getActiveProducts();
      } else {
        this.getDeletedProducts();
      }
    } else {
      this.getProductByCategory(this.categoryFilter);
      this.priceFilter = '0';
    }
  }

  onFilterChange() {
    this.prevPage = 0;
    this.nextPage = 5;
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
      this.prevPage = 0;
      this.nextPage = 5;
      this.getActiveProducts();
    } else {
      this.getDeletedProducts();
      this.prevPage = 0;
      this.nextPage = 5;
    }
  }
}
