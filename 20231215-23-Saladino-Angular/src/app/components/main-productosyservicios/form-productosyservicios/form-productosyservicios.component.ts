import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/productosyservicios.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../../services/proveedores.service';
import { CategoriasService } from '../../../services/categorias.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { Category } from '../../../models/Category';
import { Supplier } from '../../../models/Supplier';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-form-productosyservicios',
  templateUrl: './form-productosyservicios.component.html',
  styleUrl: './form-productosyservicios.component.css',
})
export class FormProductosyserviciosComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private categoryService: CategoriasService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private router2: Router
  ) {}

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

  flagCode: boolean = true;
  isNumberCode: boolean = true;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProduct = data['idProduct'];
      if (this.idProduct !== undefined) {
        this.getProductById(this.idProduct);
      } else {
        this.setupNewProduct();
      }
    });

    this.userState = this.productService.getUserState();
    this.getActiveSuppliers();
    this.getCategories();
    this.getProducts();
  }

  getActiveSuppliers() {
    this.supplierService.getActiveSuppliers().subscribe((data: Supplier[]) => {
      console.log('You get Active Suppliers');
      console.log(data);
      this.suppliers = data;
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      console.log('You get categories');
      console.log(data);
      this.categories = data;
    });
  }
  getProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      console.log('You get all products');
      console.log(data);
      this.products = data;
    });
  }

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe((data: Product) => {
      console.log('You get product by id');
      console.log(data);
      this.productViewModel = data;
    });
    this.flagCode = false;
  }

  setupNewProduct() {
    this.flagCode = true;
    this.resetProductData();
  }

  submitProduct(form: NgForm) {
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
    this.productService.postProduct(product).subscribe((data: Product) => {
      console.log('You posted a product');
      console.log(data);
      this.productViewModel = data;
      this.resetProductData();
      this.router2.navigate(['/productos-servicios']);
    });
  }

  putProduct(id: string, product: Product) {
    this.productService.putProduct(id, product).subscribe((data: Product) => {
      console.log('You put a product');
      console.log(data);
      this.productViewModel = data;
      this.resetProductData();
      this.router2.navigate(['/productos-servicios']);
    });
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
    if (this.idProduct === undefined) {
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
    this.industryViewModel = { id: '', industryName: '' };
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
