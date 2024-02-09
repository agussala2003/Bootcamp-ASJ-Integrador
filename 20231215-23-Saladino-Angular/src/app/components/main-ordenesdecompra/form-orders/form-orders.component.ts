import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { SupplierService } from '../../../services/supplier.service';
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
import { StatusService } from '../../../services/status.service';
import { AlertsService } from '../../../services/alerts.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-form-orders',
  templateUrl: './form-orders.component.html',
  styleUrl: './form-orders.component.css',
})

export class FormOrdersComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private orderDetailService: OrderDetailService,
    private statusService: StatusService,
    private alertService: AlertsService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
  initOrderNumber: string = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.idOrder = data['idOrder'];
      if (this.idOrder !== undefined) {
        this.getOrderById(this.idOrder);
        this.getOrderDetailsByOrderId(this.idOrder);
      } else {
        this.setupNewOrden();
      }
    });

    this.userState = this.loginService.getUserState();
    this.getActiveSuppliers();
    this.getOrders();
    this.getStatus();
  }

  setupNewOrden() {
    this.flagCode = true;
    this.resetOrderData();
  }

  getActiveSuppliers() {
    this.supplierService.getActiveSuppliers().subscribe(
      (data: Supplier[]) => {
        this.suppliers = data;
      },
      (error) => {
        console.log('Error getting active suppliers');
        this.alertService.errorNotification('Error al obtener proveedores');
      }
    );
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      (error) => {
        console.log('Error getting orders');
        this.alertService.errorNotification('Error al obtener ordenes');
      }
    );
  }

  getOrderById(id: string) {
    this.orderService.getOrderById(id).subscribe(
      (data: Order) => {
        console.log('You got a order by id');
        console.log(data);
        this.orderViewModel = data;
        this.orderViewModel.issuanceDate = this.getFormattedDate(
          new Date(this.orderViewModel.issuanceDate)
        );
        this.orderViewModel.deliveryDate = this.getFormattedDate(
          new Date(this.orderViewModel.deliveryDate)
        );
        this.getProductsBySupplierId(this.orderViewModel.supplier.id);
        this.supplierImg = this.orderViewModel.supplier.image;
        this.initOrderNumber = this.orderViewModel.orderNumber;
      },
      (error) => {
        console.log('Error getting order by id');
        this.alertService.errorNotification('Error al obtener orden por id');
      }
    );
    this.isProductsInOrden = true;
    this.flagCode = false;
  }

  getStatus() {
    this.statusService.getStatus().subscribe(
      (data: Status[]) => {
        console.log('You got status');
        console.log(data);
        this.statuses = data;
      },
      (error) => {
        console.log('Error getting status');
        this.alertService.errorNotification('Error al obtener status');
      }
    );
  }

  getOrderDetailsByOrderId(id: string) {
    this.orderDetailService.getOrderDetailsByOrderId(id).subscribe(
      (data: OrderDetail[]) => {
        console.log('You get Order Detail by order id');
        console.log(data);
        this.ordersDetail = data;
        this.calculateTotal();
      },
      (error) => {
        console.log('Error getting order detail by order id');
        this.alertService.errorNotification(
          'Error al obtener detalles de orden'
        );
      }
    );
  }

  getProductsBySupplierId(supplierId: string) {
    this.productService.getProductsBySupplierId(supplierId).subscribe(
      (data: Product[]) => {
        console.log('You prodcuts by supplier id');
        console.log(data);
        this.products = data.filter((item: Product) => item.active);
      },
      (error) => {
        console.log('Error getting products by supplier id');
        this.alertService.errorNotification(
          'Error al obtener productos por proveedor'
        );
      }
    );
  }

  getProductById(id: string, orderDetailViewModel: OrderDetail) {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        console.log('You got a product by id');
        console.log(data);
        orderDetailViewModel.product = data;
        this.pushProduct(orderDetailViewModel);
      },
      (error) => {
        console.log('Error getting product by id');
        this.alertService.errorNotification('Error al obtener producto por id');
      }
    );
  }

  onSupplierChange() {
    this.supplierImg =
      this.suppliers.find(
        (item: Supplier) => item.id == this.orderViewModel.supplier.id
      )?.image || '';
    this.orderDetailViewModel.product.id = '';
    this.orderDetailViewModel.quantity = 0;
    const selectedSupplier = this.orderViewModel.supplier.id;
    if (selectedSupplier) {
      this.getProductsBySupplierId(selectedSupplier);
    }
  }

  addProduct() {
    if (this.validateProduct()) {
      const existingProduct = this.ordersDetail.find(
        (item: OrderDetail) =>
          item.product.id == this.orderDetailViewModel.product.id
      );
      console.log(this.ordersDetail);
      if (existingProduct) {
        existingProduct.quantity += this.orderDetailViewModel.quantity;
        existingProduct.subtotal =
          existingProduct.quantity * existingProduct.product.price;
        this.alertService.successNotification('Producto agregado');
        this.calculateTotal();
      } else {
        this.getProductById(
          this.orderDetailViewModel.product.id,
          this.orderDetailViewModel
        );
        this.calculateTotal();
      }
    } else {
      this.openModal('No cumples con las condiciones');
    }
  }

  pushProduct(orderDetailViewModel: OrderDetail) {
    console.log(orderDetailViewModel);
    orderDetailViewModel.subtotal =
      orderDetailViewModel.quantity * orderDetailViewModel.product.price;
    this.alertService.successNotification('Producto agregado');
    this.ordersDetail.push(orderDetailViewModel);
    this.calculateTotal();
    this.resetOrderDetailData();
    this.validateSupplier();
  }

  validateProduct(): boolean {
    if (this.orderDetailViewModel.product.id === 'Selecciona un Sku') {
      return false;
    }
    if (this.orderDetailViewModel.quantity < 1) {
      return false;
    }
    return true;
  }

  deleteProduct(id: string) {
    this.ordersDetail = this.ordersDetail.filter(
      (item: OrderDetail) => item.product.id !== id
    );
    this.alertService.successNotification('Producto eliminado');
    this.calculateTotal();
    this.validateSupplier();
  }

  submitOrder(form: NgForm) {
    if (this.initOrderNumber !== this.orderViewModel.orderNumber) {
      this.isActiveOrden = this.orderExists();
    }
    if (this.validateForm()) {
      if (this.idOrder !== undefined) {
        Swal.fire({
          title: `Estas seguro que quieres actualizar orden ${this.orderViewModel.orderNumber}?`,
          text: "Una vez aceptado no podras deshacer esta accion!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, actualizala!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.putOrder(this.idOrder, this.orderViewModel);
          }
        });
      } else {
        Swal.fire({
          title: `Estas seguro que quieres crear orden ${this.orderViewModel.orderNumber}?`,
          text: "Una vez aceptado no podras deshacer esta accion!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, creala!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.postOrder(this.orderViewModel);
          }
        });
      }
    } else {
      this.openModal('No cumples con las condiciones');
    }
  }

  postOrder(order: Order) {
    let offset = new Date (order.issuanceDate).getTimezoneOffset();
    let difference = offset/60;
    
    order.issuanceDate += `T0${difference}:00:00.000Z`;
    order.deliveryDate += `T0${difference}:00:00.000Z`;

    this.orderService.postOrder(order).subscribe(
      (data) => {
        console.log('You posted a order');
        console.log(data);
        this.orderViewModel = data;
        this.postOrderDetail(this.ordersDetail);
      },
      (error) => {
        console.log('Error posting order');
        console.log(error);
      }
    );
  }

  postOrderDetail(ordersDetails: OrderDetail[]) {
    console.log(ordersDetails);
    ordersDetails.forEach((item: OrderDetail) => {
      item.order.id = this.orderViewModel.id;
    });
    this.orderDetailService.createOrderDetail(ordersDetails).subscribe(
      (data) => {
        console.log('You posted a order detail');
        console.log(data);
        ordersDetails = data;
        this.alertService.successNotification('Orden creada');
        this.router.navigate(['/ordenes']);
      },
      (error) => {
        console.log('Error posting order detail');
        console.log(error);
        this.alertService.errorNotification('Error al crear orden');
      }
    );
  }

  putOrder(id: string, order: Order) {
    let offset = new Date (order.issuanceDate).getTimezoneOffset();
    let difference = offset/60;
    
    order.issuanceDate += `T0${difference}:00:00.000Z`;
    order.deliveryDate += `T0${difference}:00:00.000Z`;
    
    this.orderService.putOrder(id, order).subscribe(
      (data) => {
        console.log('You updated a order');
        console.log(data);
        this.orderViewModel = data;
        this.alertService.successNotification('Orden actualizada');
        this.router.navigate(['/ordenes']);
      },
      (error) => {
        console.log('Error updating order');
        console.log(error);
      }
    );
  }

  validateForm(): boolean {
    const today = new Date();
    today.setDate(today.getDate() - 1);

    if (
      !this.validateOrderNumber(
        this.orderViewModel.orderNumber
      ) ||
      this.validateStringDates(
        this.orderViewModel.issuanceDate,
        this.orderViewModel.deliveryDate
      ) ||
      !this.validateStringLength(
        this.orderViewModel.receptionInfo
      )
    ) {
      return false;
    }
    if (this.idOrder === undefined) {
      if (new Date(this.orderViewModel.issuanceDate) < today) return false;
    }
    return true;
  }

  validateOrderNumber(str: string): boolean {
    const regex = /^[0-9]{1,12}$/;
    return regex.test(str);
  }

  validateStringLength(str: string): boolean {
    const long = str.length;
    return long > 14;
  }

  validateStringDates(date: string, currentDate: string): boolean {
    const dateDate = new Date(date);
    const currentDateDate = new Date(currentDate);
    return dateDate >= currentDateDate;
  }

  validateSupplier() {
    this.isProductsInOrden = this.ordersDetail.length > 0;
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  calculateTotal() {
    this.total = this.ordersDetail.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );
  }

  orderExists(): boolean {
    this.isNumberCode = /^\d+$/.test(this.orderViewModel.orderNumber);
    if (this.initOrderNumber !== this.orderViewModel.orderNumber) {
      this.isActiveOrden = this.orders.some(
        (item: Order) => item.orderNumber === this.orderViewModel.orderNumber
      );
      return this.isActiveOrden;
    }
    return false;
  }

  handleImageError() {
    this.supplierImg = '../../../../assets/img/logoGenerico.png';
  }

  openModal(alerTitle: string = 'Informacion del formulario') {
    Swal.fire({
      title: alerTitle,
      html: `<ul>
                <li class="text-start mb-2 fs-6">Todos los campos son obligatorios.</li>
                <li class="text-start mb-2 fs-6">Completar todos los campos correctamente.</li>
                <li class="text-start mb-2 fs-6">Respeta los formatos ejemplificados.</li>
                <li class="text-start mb-2 fs-6">Evita dejar espacios en el comienzo, final o entre palabras.</li>
                <li class="text-start mb-2 fs-6">El numero de orden debe ser numérico.</li>
                <li class="text-start mb-2 fs-6">El numero de orden no debe estar usado.</li>
                <li class="text-start mb-2 fs-6">La fecha de emision debe ser como minmo la fecha actual.</li>
                <li class="text-start mb-2 fs-6">La fecha de entrega debe ser posterior a la de emision.</li>
            </ul>
     `,
     confirmButtonText: 'Gracias por avisar!'
    });
  }

  resetOrderData() {
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
