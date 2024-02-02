import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { Category } from '../../../models/Category';
import { Product } from '../../../models/Product';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.css',
})
export class DetailProductsComponent {
  constructor(
    private productService: ProductService,
    private alertService: AlertsService,
    private router: ActivatedRoute,
    private router2: Router
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

  idProduct: string = '';
  userState: any;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProduct = data['idProduct'];
      this.getProductById(this.idProduct);
    });
    this.userState = this.productService.getUserState();
  }

  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        console.log('You get product by id');
        console.log(data);
        this.productViewModel = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener el producto');
      }
    );
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        console.log('You delteed a product');
        this.alertService.successNotification('Producto eliminado');
        this.router2.navigate(['/productos-servicios']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al eliminar el producto');
      }
    );
  }

  undeleteProductById(id: string) {
    this.productService.patchProduct(id).subscribe(
      (data: Product) => {
        console.log('You undeleted a product');
        console.log(data);
        this.alertService.successNotification('Producto reactivado');
        this.router2.navigate(['/productos-servicios']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al reactivar el producto');
      }
    );
  }
}
