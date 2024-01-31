import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/productosyservicios.service';
import { Product } from '../../../models/Product';
import { Category } from '../../../models/Category';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-tabla-productosyservicios',
  templateUrl: './tabla-productosyservicios.component.html',
  styleUrls: ['./tabla-productosyservicios.component.css'],
})
export class TablaProductosyserviciosComponent implements OnInit {

  industryViewModel: Industry = { id: '', industryName: '', active: true};
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
    updatedAt: ''
  }
  
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
    category: this.categoryViewModel
  }

  products: Product[] = [];
  categories: Category[] = [];
  userState: any;
  productFilter:string = '';
  categoryFilter:string = '0';
  priceFilter:string = '0';
  prevPage: number = 0;
  nextPage: number = 5;
  isActiveItems: boolean = true;
  loaderFlag = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.getActiveProducts();
    this.getCategories();
    this.userState = this.productService.getUserState();
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe((data: Product) => {
      console.log('You deleted a product');
      console.log(data);
      this.getActiveProducts();
      this.loader();
    });
  }

  undeleteProduct(id: string): void {
    this.productService.patchProduct(id).subscribe((data: Product) => {
      console.log('You undeleted a product');
      console.log(data);
      this.isActiveItems = !this.isActiveItems;
      this.getActiveProducts();
      this.loader();
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      console.log('You get Categories');
      console.log(data);
      this.categories = data.filter((item: Category) => item.active === true);
    });
  }

  getProductById(id:string) {
    this.productService.getProductById(id).subscribe((data:Product) => {
      console.log('You get a product by Id');
      console.log(data);
      this.productViewModel = data;
    })
  }

  getActiveProducts(): void {
    this.productService.getActiveProducts().subscribe((data: Product[]) => {
      console.log('You get active products');
      console.log(data);
      this.loader();
      this.products = data;
    })
  }

  getDeletedProducts(): void {
    this.productService.getDeletedProducts().subscribe((data: Product[]) => {
      console.log('You get active products');
      console.log(data);
      this.loader();
      this.products = data;
    })
  }

  getProductsByPriceAsc(): void {
    this.productService.getProductsByPriceAsc().subscribe((data: Product[]) => {
      console.log('You get products by price asc');
      console.log(data);
      this.loader();
      this.products = data.filter((item: Product) => item.active === this.isActiveItems);
    })
  }

  getProductsByPriceDesc(): void {
    this.productService.getProductsByPriceDesc().subscribe((data: Product[]) => {
      console.log('You get products by price desc');
      console.log(data);
      this.loader();
      this.products = data.filter((item: Product) => item.active === this.isActiveItems);
    })
  }

  getProductByCategory(categoryId: string): void {
    this.productService.getProductsByCategory(categoryId).subscribe((data: Product[]) => {
      console.log('You get products by category');
      console.log(data);
      this.loader();
      this.products = data.filter((item: Product) => item.active === this.isActiveItems);
    })
  }

  onPriceFilterChange() {
    if (this.priceFilter === '0') {
      if(this.isActiveItems) {
        this.getActiveProducts();
      } else {
        this.getDeletedProducts();
      }
    } else if (this.priceFilter === '1') {
      this.getProductsByPriceAsc();
      this.categoryFilter = '0';
    } else if (this.priceFilter === '2') {
      this.getProductsByPriceDesc();
      this.categoryFilter = '0';
    }
  }

  onCategoryFilterChange() {
    if (this.categoryFilter === '0') {
      if(this.isActiveItems) {
        this.getActiveProducts();
      } else {
        this.getDeletedProducts();
      }
    } else {
      this.getProductByCategory(this.categoryFilter);
      this.priceFilter = '0';
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

  onFilterChange() {
    this.prevPage = 0;
    this.nextPage = 5;
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
