import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { Category } from '../../../models/Category';
import { Product } from '../../../models/Product';
import { AlertsService } from '../../../services/alerts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.css',
})

export class DetailProductsComponent {

  constructor(
    private productService: ProductService,
    private alertService: AlertsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
    this.activatedRoute.params.subscribe((data) => {
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
    Swal.fire({
      title: `Estas seguro que quieres borrar el producto ${this.productViewModel.productName}?`,
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
          (data) => {
            console.log('You delteed a product');
            this.alertService.successNotification('Producto eliminado');
            this.router.navigate(['/productos-servicios']);
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al eliminar el producto');
          }
        );
      }
    });
  }

  undeleteProductById(id: string) {
    Swal.fire({
      title: `Estas seguro que quieres reactivar el producto ${this.productViewModel.productName}?`,
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
            this.alertService.successNotification('Producto reactivado');
            this.router.navigate(['/productos-servicios']);
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al reactivar el producto');
          }
        );
      }
    });
  }
}
