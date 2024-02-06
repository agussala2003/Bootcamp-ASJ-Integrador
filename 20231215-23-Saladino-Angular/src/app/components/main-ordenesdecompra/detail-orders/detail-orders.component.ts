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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-orders',
  templateUrl: './detail-orders.component.html',
  styleUrls: ['./detail-orders.component.css'], // Ajustado el nombre de la propiedad
})

export class DetailOrdersComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private alertService: AlertsService,
    private router: Router
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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idOrder = params['idOrder'];
      this.getOrderById(this.idOrder);
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
    Swal.fire({
      title: `Estas seguro que quieres cancelar la orden ${this.orderViewModel.orderNumber}?`,
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
    });
  }

  undeleteOrder(id: string): void {
    Swal.fire({
      title: `Estas seguro que quieres reactivar la orden ${this.orderViewModel.orderNumber}?`,
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

  getOrderById(id: string): void {
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
