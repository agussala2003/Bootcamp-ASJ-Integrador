import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../../services/ordenes.service';
import { Order } from '../../../models/Order';
import { User } from '../../../models/User';
import { Role } from '../../../models/Role';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { Status } from '../../../models/Status';
import { ProductService } from '../../../services/productosyservicios.service';
import { Product } from '../../../models/Product';
import { SupplierService } from '../../../services/proveedores.service';
import { OrderDetailService } from '../../../services/order-detail.service';
import { OrderDetail } from '../../../models/OrderDetail';

@Component({
  selector: 'app-tabla-ordenesdecompra',
  templateUrl: './tabla-ordenesdecompra.component.html',
  styleUrls: ['./tabla-ordenesdecompra.component.css'], // Ajustado el nombre de la propiedad
})
export class TablaOrdenesdecompraComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private orderDetailService: OrderDetailService,
    private supplierService: SupplierService
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

  orders: Order[] = [];
  products: Product[] = [];
  suppliers: Supplier[] = [];
  orderDetails: OrderDetail[] = [];
  userState: any;
  total: string = '';
  orderFilter: string = '';
  prevPage: number = 0;
  nextPage: number = 5;
  isActiveItems: boolean = true;

  ngOnInit(): void {
    this.getActiveOrders();
    this.getOrderDetails();
    this.userState = this.orderService.getUserState();
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe((data: Order) => {
      console.log('You deleted a order');
      console.log(data);
      this.getActiveOrders();
    });
  }

  calculateTotal(order: Order): number {
   let total = 0;
   this.orderDetails.forEach((orderDetail) => {
    if (orderDetail.order.id === order.id){
      total += orderDetail.quantity * orderDetail.product.price;
    }
    });
    return total;
  }

  getOrderDetails(){
    this.orderDetailService.getOrderDetails().subscribe((data: OrderDetail[]) => {
      console.log('You get order details');
      console.log(data);
      this.orderDetails = data;
    });
  }
  getOrders() {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      console.log('You get orders');
      console.log(data);
      this.orders = data;
      this.formatDates(this.orders);
    });
  }

  formatDates(orders: Order[]) {
    orders.forEach((order) => {
      order.issuanceDate = this.getFormattedDate(new Date(order.issuanceDate));
      order.deliveryDate = this.getFormattedDate(new Date(order.deliveryDate));
    });
  }

  getActiveOrders() {
    this.orderService.getActiveOrders().subscribe((data: Order[]) => {
      console.log('You get active orders');
      console.log(data);
      this.orders = data;
      this.formatDates(this.orders);
    });
  }

  getDeletedOrders() {
    this.orderService.getDeletedOrders().subscribe((data: Order[]) => {
      console.log('You get deleted orders');
      console.log(data);
      this.orders = data;
      this.formatDates(this.orders);
    });
  }

  getOrderById(id: string) {
    this.orderService.getOrderById(id).subscribe((data: Order) => {
      console.log('You get a order by Id');
      console.log(data);
      this.orderViewModel = data;
    });
  }

  undeleteOrder(id: string): void {
    this.orderService.undeleteOrder(id).subscribe((data: Order) => {
      console.log('You undeleted a order');
      console.log(data);
      this.isActiveItems = !this.isActiveItems;
      this.getActiveOrders();
    });
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate() + 1).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getActiveSuppliers(): void {
    this.supplierService.getActiveSuppliers().subscribe((data: Supplier[]) => {
      console.log('You get active suppliers');
      console.log(data);
      this.suppliers = data;
    });
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

  changeState() {
    this.isActiveItems = !this.isActiveItems;
    if (this.isActiveItems) {
      this.prevPage = 0;
      this.nextPage = 5;
      this.getActiveOrders();
    } else {
      this.getDeletedOrders();
      this.prevPage = 0;
      this.nextPage = 5;
    }
  }
}
