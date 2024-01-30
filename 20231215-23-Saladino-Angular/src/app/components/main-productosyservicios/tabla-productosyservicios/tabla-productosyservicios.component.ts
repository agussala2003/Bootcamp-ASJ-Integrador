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

  industryViewModel: Industry = { id: '', industryName: '' };
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
  categoryFilter:string = '';
  priceFilter:string = '0';
  prevPage: number = 0;
  nextPage: number = 5;
  isActiveItems: boolean = true;

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
    });
  }

  undeleteProduct(id: string): void {
    this.productService.patchProduct(id).subscribe((data: Product) => {
      console.log('You undeleted a product');
      console.log(data);
      this.isActiveItems = !this.isActiveItems;
      this.getActiveProducts();
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      console.log('You get Categories');
      console.log(data);
      this.categories = data;
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
      this.products = data;
    })
  }

  getDeletedProducts(): void {
    this.productService.getDeletedProducts().subscribe((data: Product[]) => {
      console.log('You get active products');
      console.log(data);
      this.products = data;
    })
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
