import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import { CategoryService } from '../../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { Category } from '../../../models/Category';
import { Supplier } from '../../../models/Supplier';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Product } from '../../../models/Product';
import { AlertsService } from '../../../services/alerts.service';

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
    private modalService: NgbModal,
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
    this.router.params.subscribe((data) => {
      this.idProduct = data['idProduct'];
      if (this.idProduct !== undefined) {
        this.getProductById(this.idProduct);
      } else {
        this.setupNewProduct();
        this.openModal('Informacion del formulario');
      }
    });

    this.userState = this.productService.getUserState();
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
        this.putProduct(this.idProduct, this.productViewModel);
      } else {
        this.postProduct(this.productViewModel);
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
        this.router2.navigate(['/productos-servicios']);
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
        this.router2.navigate(['/productos-servicios']);
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
      !this.validarCodigoNumericoDe8Digitos(this.productViewModel.sku) ||
      this.productViewModel.supplier.id === 'Selecciona un proveedor' ||
      this.productViewModel.category.id === 'Selecciona una categoria' ||
      this.isActiveSku ||
      !this.validarStringAlfanumericoEntre3y50Caracteres(
        this.productViewModel.productName
      ) ||
      !this.validarStringAlfanumericoEntre15y250Caracteres(
        this.productViewModel.description
      ) ||
      this.productViewModel.price < 1 ||
      !this.validarUrl(this.productViewModel.imageUrl)
    ) {
      return false;
    }
    return true;
  }

  validarCodigoNumericoDe8Digitos(str: string): boolean {
    const regex = /^[0-9]{8}$/;
    return regex.test(str);
  }

  validarStringAlfanumericoEntre3y50Caracteres(str: string): boolean {
    const regex = /^[0-9 A-Z a-z]{3,50}$/;
    return regex.test(str);
  }

  validarStringAlfanumericoEntre15y250Caracteres(str: string): boolean {
    const long = str.length;
    return long > 14;
  }

  validarUrl(sitioWeb: string): boolean {
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

  openModal(aviso: string = 'Informacion del formulario') {
    const mensajes: string[] = [];

    mensajes.push('Todos los campos son obligatorios.');
    mensajes.push('Completar todos los campos correctamente.');
    mensajes.push('Respeta los formatos ejemplificados.');
    mensajes.push(
      'Evita dejar espacios en el comienzo, final o entre palabras.'
    );
    mensajes.push(
      'El código debe ser numérico y contener exactamente 8 dígitos.'
    );
    mensajes.push(
      'La Imagen debe comenzar con "https://" y seguir un formato válido.'
    );
    mensajes.push('Ingresa un código que no exista.');

    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.listado = mensajes;
    modalRef.componentInstance.aviso = aviso;
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
