import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderDetailService } from '../../../services/order-detail.service';
import { Role } from '../../../models/Role';
import { User } from '../../../models/User';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { Supplier } from '../../../models/Supplier';
import { Status } from '../../../models/Status';
import { Order } from '../../../models/Order';
import { Category } from '../../../models/Category';
import { Product } from '../../../models/Product';
import { OrderDetail } from '../../../models/OrderDetail';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-detail-orders',
  templateUrl: './detail-orders.component.html',
  styleUrls: ['./detail-orders.component.css'], // Ajustado el nombre de la propiedad
})
export class DetailOrdersComponent implements OnInit {
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

  idOrder: string = '';
  userState: any;
  orderDetails: OrderDetail[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private alertService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idOrder = params['idOrder'];
      this.loadOrderData(this.idOrder);
      this.getOrderDetailsByOrderId(this.idOrder);
    });
    this.userState = this.orderService.getUserState();
  }

  getOrderDetailsByOrderId(id: string): void {
    this.orderDetailService.getOrderDetailsByOrderId(id).subscribe(
      (data: OrderDetail[]) => {
        console.log('You get order details by order Id');
        console.log(data);
        this.orderDetails = data;
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification(
          'Error al cargar los detalles de la orden'
        );
      }
    );
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe(
      (data) => {
        console.log('You deleted a order');
        console.log(data);
        this.alertService.successNotification('Orden cancelada');
        this.router.navigate(['/ordenes']);
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al cancelar la orden');
      }
    );
  }

  undeleteOrder(id: string): void {
    this.orderService.undeleteOrder(id).subscribe(
      (data) => {
        console.log('You undeleted a order');
        console.log(data);
        this.alertService.successNotification('Orden reactivada');
        this.router.navigate(['/ordenes']);
      },
      (error) => {
        console.error(error);
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

  loadOrderData(id: string): void {
    this.orderService.getOrderById(id).subscribe(
      (data: Order) => {
        console.log(this.orderViewModel);
        console.log('You get order by Id');
        this.orderViewModel = data;
      },
      (error) => {
        console.error(error);
        this.alertService.errorNotification('Error al cargar la orden');
      }
    );
  }
}
