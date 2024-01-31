import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/productosyservicios.service';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { Category } from '../../../models/Category';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-detalle-prod',
  templateUrl: './detalle-prod.component.html',
  styleUrl: './detalle-prod.component.css',
})
export class DetalleProdComponent {
  constructor(
    public productService: ProductService,
    public router: ActivatedRoute,
    public router2: Router
  ) {}

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
  
  getProductById(id: string):void {
    this.productService.getProductById(id).subscribe((data: Product) => {
      console.log("You get product by id");
      console.log(data);
      this.productViewModel = data;
    }
    );
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        console.log('You delteed a product');
        this.router2.navigate(['/productos-servicios']);
      }
    );
  }

  undeleteProductById(id:string) {
    this.productService.patchProduct(id).subscribe((data:Product) => {
      console.log("You undeleted a product");
      console.log(data);
      this.router2.navigate(['/productos-servicios']);
    })
  }
}
