import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/Order';
import { User } from '../../../models/User';
import { Role } from '../../../models/Role';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { Status } from '../../../models/Status';
import { Product } from '../../../models/Product';
import { SupplierService } from '../../../services/supplier.service';
import { OrderDetailService } from '../../../services/order-detail.service';
import { OrderDetail } from '../../../models/OrderDetail';
import { StatusService } from '../../../services/status.service';
import { AlertsService } from '../../../services/alerts.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.css'], // Ajustado el nombre de la propiedad
})

export class TableOrdersComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private supplierService: SupplierService,
    private statusService: StatusService,
    private alertService: AlertsService,
    private loginService: LoginService
  ) {}

  roleViewModel: Role = {
    id: '',
    roleName: '',
    createdAt: '',
    updatedAt: '',
  };

  userViewModel: User = {
    id: '',
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

  orders: Order[] = [];
  products: Product[] = [];
  suppliers: Supplier[] = [];
  statuses: Status[] = [];
  orderDetails: OrderDetail[] = [];
  userState: any;
  total: string = '';
  prevPage: number = 0;
  nextPage: number = 5;
  stateFilter: string = '0';
  loaderFlag = false;

  ngOnInit(): void {
    this.getOrders();
    this.getOrderDetails();
    this.getStaus();
    this.userState = this.loginService.getUserState();
  }

  getOrderDetails() {
    this.orderDetailService.getOrderDetails().subscribe(
      (data: OrderDetail[]) => {
        console.log('You get order details');
        console.log(data);
        this.orderDetails = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Error al obtener los detalles de la orden'
        );
      }
    );
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        console.log('You get orders');
        console.log(data);
        this.orders = data;
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Error al obtener las ordenes de compra'
        );
      }
    );
  }

  getStaus() {
    this.statusService.getStatus().subscribe(
      (data: Status[]) => {
        console.log('You get statuses');
        console.log(data);
        this.statuses = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los estados');
      }
    );
  }

  getOrderByStatus(id: string) {
    this.orderService.getOrderByStatus(id).subscribe(
      (data: Order[]) => {
        console.log('You get a order by status');
        console.log(data);
        this.orders = data;
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Error al obtener las ordenes de compra'
        );
      }
    );
  }

  getActiveSuppliers(): void {
    this.supplierService.getActiveSuppliers().subscribe(
      (data: Supplier[]) => {
        console.log('You get active suppliers');
        console.log(data);
        this.suppliers = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los proveedores');
      }
    );
  }

  deleteOrder(id: string, orderNumber:string): void {
    Swal.fire({
      title: `Estas seguro que quieres cancelar la orden ${orderNumber}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, cancelala!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id).subscribe(
          (data: Order) => {
            console.log('You deleted a order');
            console.log(data);
            this.getOrders();
            this.alertService.successNotification('Orden cancelada');
            this.loader();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al cancelar la orden');
          }
        );
      }
    });
  }

  undeleteOrder(id: string, orderNumber:string): void {
    Swal.fire({
      title: `Estas seguro que quieres reactivar la orden ${orderNumber}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, activala!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.undeleteOrder(id).subscribe(
          (data: Order) => {
            console.log('You undeleted a order');
            console.log(data);
            this.getOrders();
            this.alertService.successNotification('Orden reactivada');
            this.loader();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al reactivar la orden');
          }
        );
      }
    });
  }

  calculateTotal(order: Order): number {
    let total = 0;
    this.orderDetails.forEach((orderDetail) => {
      if (orderDetail.order.id === order.id) {
        total += orderDetail.quantity * orderDetail.product.price;
      }
    });
    return total;
  }

  onStatusFilterChange() {
    if (this.stateFilter === '0') {
      this.getOrders();
    } else {
      this.getOrderByStatus(this.stateFilter);
    }
  }

  loader() {
    this.loaderFlag = true;
    setTimeout(() => {
      this.loaderFlag = false;
    }, 1000);
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
}
