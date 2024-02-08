import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { Supplier } from '../../../models/Supplier';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Product } from '../../../models/Product';
import { AlertsService } from '../../../services/alerts.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css',
})

export class FormProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private categoryService: CategoryService,
    private alertService: AlertsService,
    private loginService: LoginService,
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
  suppliers: Supplier[] = [];
  categories: Category[] = [];
  products: Product[] = [];
  isActiveSku: any = false;
  supplierImg: string = '';
  initProductCode: string = '';
  categoryFlag: boolean = false;
  newCategory: string = '';
  flagCode: boolean = true;
  isNumberCode: boolean = true;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.idProduct = data['idProduct'];
      if (this.idProduct !== undefined) {
        this.getProductById(this.idProduct);
      } else {
        this.setupNewProduct();
      }
    });

    this.userState = this.loginService.getUserState();
    this.getActiveSuppliers();
    this.getCategories();
    this.getProducts();
  }

  setupNewProduct() {
    this.flagCode = true;
    this.resetProductData();
  }

  getActiveSuppliers() {
    this.supplierService.getActiveSuppliers().subscribe(
      (data: Supplier[]) => {
        console.log('You get Active Suppliers');
        console.log(data);
        this.suppliers = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'No se pudo obtener la lista de proveedores'
        );
      }
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        console.log('You get categories');
        console.log(data);
        this.categories = data.filter((item: Category) => item.active === true);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'No se pudo obtener la lista de categorias'
        );
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        console.log('You get all products');
        console.log(data);
        this.products = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'No se pudo obtener la lista de productos'
        );
      }
    );
  }

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        console.log('You get product by id');
        console.log(data);
        this.productViewModel = data;
        this.supplierImg = this.productViewModel.supplier.image;
        this.initProductCode = this.productViewModel.sku;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo obtener el producto');
      }
    );
    this.flagCode = false;
  }

  onSupplierChange() {
    this.supplierImg =
      this.suppliers.find(
        (item: Supplier) => item.id == this.productViewModel.supplier.id
      )?.image || '';
  }

  postCategory() {
    if (this.newCategory !== '') {
      this.categoryViewModel.categoryName = this.newCategory;
      this.categoryService.postCategory(this.categoryViewModel).subscribe(
        (data: Category) => {
          console.log('You posted a category');
          console.log(data);
          this.categoryViewModel = data;
          this.getCategories();
          this.alertService.successNotification('Categoria creada con exito');
          this.productViewModel.category.id = this.categoryViewModel.id;
          this.categoryFlag = false;
          this.newCategory = '';
        },
        (error) => {
          console.log(error);
          this.alertService.errorNotification('No se pudo crear la categoria');
        }
      );
    }
  }

  submitProduct(form: NgForm) {
    if (this.initProductCode !== this.productViewModel.sku) {
      this.skuExists();
    }
    if (this.validateForm()) {
      if (this.idProduct !== undefined) {
        Swal.fire({
          title: `Estas seguro que quieres actualizar el producto ${this.productViewModel.productName}?`,
          text: "Una vez aceptado no podras deshacer esta accion!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, actualizalo!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.putProduct(this.idProduct, this.productViewModel);
          }
        });
      } else {
        Swal.fire({
          title: `Estas seguro que quieres crear el producto ${this.productViewModel.productName}?`,
          text: "Una vez aceptado no podras deshacer esta accion!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, crealo!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.postProduct(this.productViewModel);
          }
        });
      }
    } else {
      this.openModal('No cumples con las condiciones');
    }
  }

  postProduct(product: Product) {
    this.productService.postProduct(product).subscribe(
      (data: Product) => {
        console.log('You posted a product');
        console.log(data);
        this.productViewModel = data;
        this.resetProductData();
        this.alertService.successNotification('Producto creado con exito');
        this.router.navigate(['/productos-servicios']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo crear el producto');
      }
    );
  }

  putProduct(id: string, product: Product) {
    this.productService.putProduct(id, product).subscribe(
      (data: Product) => {
        console.log('You put a product');
        console.log(data);
        this.productViewModel = data;
        this.resetProductData();
        this.alertService.successNotification('Producto actualizado con exito');
        this.router.navigate(['/productos-servicios']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'No se pudo actualizar el producto'
        );
      }
    );
  }

  validateForm(): boolean {
    if (
      !this.validateSku(this.productViewModel.sku) ||
      this.productViewModel.supplier.id === 'Selecciona un proveedor' ||
      this.productViewModel.category.id === 'Selecciona una categoria' ||
      this.isActiveSku ||
      !this.validateRegularString(
        this.productViewModel.productName
      ) ||
      !this.validateLongString(
        this.productViewModel.description
      ) ||
      this.productViewModel.price < 1 ||
      !this.validateUrl(this.productViewModel.imageUrl)
    ) {
      return false;
    }
    return true;
  }

  validateSku(str: string): boolean {
    const regex = /^[0-9]{8}$/;
    return regex.test(str);
  }

  validateRegularString(str: string): boolean {
    const regex = /^[0-9 A-Z a-z]{3,50}$/;
    return regex.test(str);
  }

  validateLongString(str: string): boolean {
    const long = str.length;
    return long > 14;
  }

  validateUrl(sitioWeb: string): boolean {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(sitioWeb);
  }

  skuExists() {
    if (this.initProductCode !== this.productViewModel.sku) {
      if (!/^\d+$/.test(this.productViewModel.sku)) {
        console.log('El código debe ser numérico');
        this.isNumberCode = false;
      } else {
        this.isNumberCode = true;
      }

      this.isActiveSku = this.products.some(
        (item: Product) => item.sku === this.productViewModel.sku
      );
    }
  }

  openModal(alerTitle: string = 'Informacion del formulario') {
    Swal.fire({
      title: alerTitle,
      html: `<ul>
                <li class="text-start mb-2 fs-6">Todos los campos son obligatorios.</li>
                <li class="text-start mb-2 fs-6">Completar todos los campos correctamente.</li>
                <li class="text-start mb-2 fs-6">Respeta los formatos ejemplificados.</li>
                <li class="text-start mb-2 fs-6">Evita dejar espacios en el comienzo, final o entre palabras.</li>
                <li class="text-start mb-2 fs-6">El Sku debe ser numérico y contener exactamente 8 dígitos.</li>
                <li class="text-start mb-2 fs-6">El Sku no debe estar repetido.</li>
                <li class="text-start mb-2 fs-6">La Imagen debe comenzar con "https://" y seguir un formato válido.</li>
            </ul>
     `,
     confirmButtonText: 'Gracias por avisar!'
    });
  }

  resetProductData() {
    this.industryViewModel = { id: '', industryName: '', active: true };
    this.ivaConditionViewModel = { id: '', taxCondition: '' };
    this.supplierViewModel = {
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

    this.categoryViewModel = {
      id: '',
      categoryName: '',
      active: true,
      createdAt: '',
      updatedAt: '',
    };

    this.productViewModel = {
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
  }
}
