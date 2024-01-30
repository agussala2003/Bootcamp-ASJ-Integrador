import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/ordenes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/productosyservicios.service';
import { NgForm } from '@angular/forms';
import { SupplierService } from '../../../services/proveedores.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { Supplier } from '../../../models/Supplier';
import { Product } from '../../../models/Product';
import { Role } from '../../../models/Role';
import { User } from '../../../models/User';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Status } from '../../../models/Status';
import { Order } from '../../../models/Order';
import { Category } from '../../../models/Category';
import { OrderDetail } from '../../../models/OrderDetail';
import { OrderDetailService } from '../../../services/order-detail.service';
import { StatusService } from '../../../services/status-service.service';

@Component({
  selector: 'app-form-ordenesdecompra',
  templateUrl: './form-ordenesdecompra.component.html',
  styleUrl: './form-ordenesdecompra.component.css',
})
export class FormOrdenesdecompraComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private orderDetailService: OrderDetailService,
    private statusService: StatusService,
    private router: ActivatedRoute,
    private router2: Router,
    private modalService: NgbModal 
  ) {}

    
  roleViewModel: Role = {
    id: '1',
    roleName: '',
    createdAt: '',
    updatedAt: '',
  };

  userViewModel: User = {
    id: '1',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: this.roleViewModel,
    createdAt: '',
    updatedAt: '',
  };

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

  statusViewModel: Status = {
    id: '',
    statusName: '',
  };

  orderViewModel: Order = {
    id: '',
    orderNumber: '',
    issuanceDate: '',
    deliveryDate: '',
    active: true,
    receptionInfo: '',
    createdAt: '',
    updatedAt: '',
    status: this.statusViewModel,
    supplier: this.supplierViewModel,
    user: this.userViewModel,
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

  orderDetailViewModel: OrderDetail = {
    id: '',
    quantity: 0,
    createdAt: '',
    updatedAt: '',
    subtotal: 0,
    order: this.orderViewModel,
    product: this.productViewModel,
  };

  ordersDetail: OrderDetail[] = [];
  orders: Order[] = [];
  suppliers: Supplier[] = [];
  products: Product[] = [];
  statuses: Status[] = [];
  idOrder: string = '';
  userState: any;
  supplierImg: string = '';
  flagCode: boolean = true;
  isActiveOrden: boolean = false;
  isProductsInOrden: boolean = false;
  isNumberCode: boolean = true;
  today: Date = new Date();
  total: number = 0;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idOrder = data['idOrder'];
      if(this.idOrder !== undefined) {
        this.getOrderById(this.idOrder)
        this.getOrderDetailsByOrderId(this.idOrder)
      } else {
        this.setupNewOrden();
      }
    });

    this.userState = this.orderService.getUserState();
    this.getActiveSuppliers();
    this.getOrders();
    this.getStatus();
  }

  getActiveSuppliers() {
    this.supplierService.getActiveSuppliers().subscribe((data: Supplier[]) => {
      this.suppliers = data;
    });
  }
  getOrders() {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }
  getOrderById(id: string) {
    this.orderService.getOrderById(id).subscribe((data: Order) => {
      console.log('You got a order by id');
      console.log(data);
      this.orderViewModel = data;
      this.orderViewModel.issuanceDate = this.getFormattedDate(new Date(this.orderViewModel.issuanceDate));
      this.orderViewModel.deliveryDate = this.getFormattedDate(new Date(this.orderViewModel.deliveryDate));
      this.getProductsBySupplierId(this.orderViewModel.supplier.id);
    });
    this.isProductsInOrden = true;
    this.flagCode = false;
  }
  getStatus() {
    this.statusService.getStatus().subscribe((data: Status[]) => {
      console.log('You got status');
      console.log(data);
      this.statuses = data;
    });
  }
  getOrderDetailsByOrderId(id:string) {
    this.orderDetailService.getOrderDetailsByOrderId(id).subscribe((data: OrderDetail[]) => {
      console.log('You get Order Detail by order id');
      console.log(data);
      this.ordersDetail = data;
      this.calculateTotal();
    })
  }

  onSupplierChange() {
    this.supplierImg = this.suppliers.find((item: Supplier) => item.id == this.orderViewModel.supplier.id)?.image || '';
    const selectedSupplier = this.orderViewModel.supplier.id;
    if (selectedSupplier) {
      this.getProductsBySupplierId(selectedSupplier);
    }
  }
  getProductsBySupplierId(supplierId: string) {
    this.productService.getProductsBySupplierId(supplierId).subscribe((data: Product[]) => {
      console.log('You prodcuts by supplier id');
      console.log(data);
      this.products = data;
    });
  }

  setupNewOrden() {
    this.flagCode = true;
    this.resetOrderData();
  }

  submitOrder(form: NgForm) {
    if (this.validateForm()) {
      if(this.idOrder !== undefined) {
        this.putOrder(this.idOrder, this.orderViewModel);
      } else {
        this.postOrder(this.orderViewModel);
      }
    } else {
      this.openModal('No cumples con las condiciones');
    }
  }

  postOrder(order: Order) {
    console.log(order);
    this.orderService.postOrder(order).subscribe((data) => {
      console.log('You posted a order');
      console.log(data);
      this.orderViewModel = data;
      this.postOrderDetail(this.ordersDetail);
    }, (error) => {
      console.log('Error posting order');
      console.log(error);
    });
  }
  postOrderDetail(ordersDetails: OrderDetail[]) {
    console.log(ordersDetails);
    ordersDetails.forEach((item) => {
      item.order.id = this.orderViewModel.id;
    });
    this.orderDetailService.createOrderDetail(ordersDetails).subscribe((data) => {
      console.log('You posted a order detail');
      console.log(data);
      ordersDetails = data;
      this.router2.navigate(['/ordenes']);
    }, (error) => {
      console.log('Error posting order detail');
      console.log(error);
    });
  }

  putOrder(id: string, order: Order) {
    this.orderService.putOrder(id, order).subscribe((data) => {
      console.log('You updated a order');
      console.log(data);
      this.orderViewModel = data;
      this.putOrderDetail(this.ordersDetail);
    }, (error) => {
      console.log('Error updating order');
      console.log(error);
    });
  }
  putOrderDetail(ordersDetails: OrderDetail[]) {
    ordersDetails.forEach((item) => {
      item.order.id = this.orderViewModel.id;
    });
    console.log(ordersDetails);
    this.orderDetailService.updateOrderDetail(ordersDetails).subscribe((data) => {
      console.log('You updated a order detail');
      console.log(data);
      ordersDetails = data;
      this.router2.navigate(['/ordenes']);
    }
    , (error) => {
      console.log('Error updating order detail');
      console.log(error);
    });
  }


  validateForm(): boolean {
    const today = new Date();
    today.setDate(today.getDate() - 1)

    //    this.orderViewModel.supplier.id === 'Selecciona un Sku' ||
    if(!this.validarCodigoNumericoDe1a12Digitos(this.orderViewModel.orderNumber) ||

    this.validateStringDates(this.orderViewModel.issuanceDate, this.orderViewModel.deliveryDate) ||
    !this.validarStringAlfanumericoEntre15y250Caracteres(this.orderViewModel.receptionInfo)) {
      return false;
    }
    if(this.idOrder === undefined) {
      if(new Date(this.orderViewModel.issuanceDate) < today) return false;
    }
    return true;

  }

  validarCodigoNumericoDe1a12Digitos(str: string): boolean {
    const regex = /^[0-9]{1,12}$/;
    return regex.test(str);
  }
  validarStringAlfanumericoEntre15y250Caracteres(str: string): boolean {
    const long = str.length
    return long > 14;
  }
  validateStringDates(date: string, currentDate: string): boolean {
    const dateDate = new Date(date);
    const currentDateDate = new Date(currentDate);
    return dateDate >= currentDateDate;
  }
  validacionProveedor() {
    this.isProductsInOrden = this.ordersDetail.length > 0;
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate() + 1).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  addProduct() {
    if (this.validateProduct()) {
      const existingProduct = this.ordersDetail.find((item: OrderDetail) => item.product.id == this.orderDetailViewModel.product.id);
      console.log(this.ordersDetail);
      if (existingProduct) {
        existingProduct.quantity += this.orderDetailViewModel.quantity;
        existingProduct.subtotal = existingProduct.quantity * existingProduct.product.price;
        console.log('You added a product');
        this.calculateTotal()
      } else {
        this.getProductById(this.orderDetailViewModel.product.id, this.orderDetailViewModel);
        this.calculateTotal()
      }
    } else {
      this.openModal('No cumples con las condiciones');
    }
  }

  getProductById(id: string, orderDetailViewModel: OrderDetail) {
    this.productService.getProductById(id).subscribe((data: Product) => {
      console.log('You got a product by id');
      console.log(data);
      orderDetailViewModel.product = data;
      this.pushProduct(orderDetailViewModel);
    });
  }

  pushProduct(orderDetailViewModel: OrderDetail) {
    console.log(orderDetailViewModel);
    orderDetailViewModel.subtotal = orderDetailViewModel.quantity * orderDetailViewModel.product.price;
    this.ordersDetail.push(orderDetailViewModel);
    this.calculateTotal();
    this.resetOrderDetailData();
    this.validacionProveedor();
  }

  validateProduct(): boolean {
    if (this.orderDetailViewModel.product.id === 'Selecciona un Sku') {
      return false;
    }
    return true;
  }

  deleteProduct(id: string) {
    this.ordersDetail = this.ordersDetail.filter((item:OrderDetail) => item.product.id !== id);
    this.calculateTotal();
    this.validacionProveedor();
  }

  calculateTotal() {
    this.total = this.ordersDetail.reduce((acc, item) => acc + item.subtotal, 0);
    // this.orderViewModel.receptionInfo = total.toString();
  }

  orderExists(): boolean {
    if (this.idOrder === undefined) {
      this.isNumberCode = /^\d+$/.test(this.orderViewModel.orderNumber);
      this.isActiveOrden = this.orders.some((item:Order) => item.orderNumber === this.orderViewModel.orderNumber);
      return this.isActiveOrden;
    }
    return false;
  }

  openModal(aviso: string = "Informacion del formulario") {
    const mensajes: string[] = [];
  
    mensajes.push('Todos los campos son obligatorios.');
    mensajes.push('Completar todos los campos correctamente.');
    mensajes.push('Respeta los formatos ejemplificados.');
    mensajes.push('Evita dejar espacios en el comienzo, final o entre palabras.');
    mensajes.push('El numero de orden debe ser numérico y contener exactamente 8 dígitos.');
    mensajes.push('Ingresa un numero de orden que no exista.');
    mensajes.push('La fecha de emision debe ser como minmo la fecha actual.');
    mensajes.push('La fecha de entrega debe ser posterior a la de emision.');
  
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.listado = mensajes;
    modalRef.componentInstance.aviso = aviso;
  }

  resetOrderData(){
    this.roleViewModel = {
      id: '1',
      roleName: '',
      createdAt: '',
      updatedAt: '',
    };
  
    this.userViewModel = {
      id: '1',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: this.roleViewModel,
      createdAt: '',
      updatedAt: '',
    };
  
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
  
    this.statusViewModel = {
      id: '',
      statusName: '',
    };
  
    this.orderViewModel = {
      id: '',
      orderNumber: '',
      issuanceDate: '',
      deliveryDate: '',
      active: true,
      receptionInfo: '',
      createdAt: '',
      updatedAt: '',
      status: this.statusViewModel,
      supplier: this.supplierViewModel,
      user: this.userViewModel,
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
  
    this.orderDetailViewModel = {
      id: '',
      quantity: 0,
      createdAt: '',
      updatedAt: '',
      subtotal: 0,
      order: this.orderViewModel,
      product: this.productViewModel,
    };
  }

  resetOrderDetailData() {
    this.orderDetailViewModel = {
      id: '',
      quantity: 0,
      createdAt: '',
      updatedAt: '',
      subtotal: 0,
      order: this.orderViewModel,
      product: this.productViewModel,
    };
  }
}
