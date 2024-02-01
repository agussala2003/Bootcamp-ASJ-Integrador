import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/ordenes.service';
import { Order } from '../../../models/Order';
import { User } from '../../../models/User';
import { Role } from '../../../models/Role';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { Status } from '../../../models/Status';
import { Product } from '../../../models/Product';
import { SupplierService } from '../../../services/proveedores.service';
import { OrderDetailService } from '../../../services/order-detail.service';
import { OrderDetail } from '../../../models/OrderDetail';
import { StatusService } from '../../../services/status-service.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-tabla-ordenesdecompra',
  templateUrl: './tabla-ordenesdecompra.component.html',
  styleUrls: ['./tabla-ordenesdecompra.component.css'], // Ajustado el nombre de la propiedad
})
export class TablaOrdenesdecompraComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private supplierService: SupplierService,
    private statusService: StatusService,
    private alertService: AlertsService
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
    this.userState = this.orderService.getUserState();
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
        this.formatDates(this.orders);
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
        this.formatDates(this.orders);
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

  getOrderById(id: string) {
    this.orderService.getOrderById(id).subscribe(
      (data: Order) => {
        console.log('You get a order by Id');
        console.log(data);
        this.orderViewModel = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Error al obtener la orden de compra'
        );
      }
    );
  }

  deleteOrder(id: string): void {
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

  undeleteOrder(id: string): void {
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

  formatDates(orders: Order[]) {
    orders.forEach((order) => {
      order.issuanceDate = this.getFormattedDate(new Date(order.issuanceDate));
      order.deliveryDate = this.getFormattedDate(new Date(order.deliveryDate));
    });
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate() + 1).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
