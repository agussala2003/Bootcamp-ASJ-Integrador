import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/ordenes.service';
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

@Component({
  selector: 'app-detalle-ordenes',
  templateUrl: './detalle-ordenes.component.html',
  styleUrls: ['./detalle-ordenes.component.css'], // Ajustado el nombre de la propiedad
})
export class DetalleOrdenesComponent implements OnInit {
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

  idOrder: string = '';
  userState: any;
  orderDetails: OrderDetail[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idOrder = params['idOrder'];
      this.loadOrdenData(this.idOrder);
      this.getOrderDetailsByOrderId(this.idOrder);
      this.getOrderDetails();
    });
    this.userState = this.orderService.getUserState();
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


  loadOrdenData(id:string): void {
    this.orderService.getOrderById(id).subscribe((data: Order) => {
      console.log(this.orderViewModel);
      console.log('You get order by Id');
      this.orderViewModel = data;
    });
  }
  getOrderDetailsByOrderId(id: string): void {
    this.orderDetailService
      .getOrderDetailsByOrderId(id)
      .subscribe((data: OrderDetail[]) => {
        console.log('You get order details by order Id');
        console.log(data);
        this.orderDetails = data;
      });
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe((data) => {
      console.log('You deleted a order');
      console.log(data);
    });
    this.router.navigate(['/ordenes']);
  }

  undeleteOrder(id: string): void {
    this.orderService.undeleteOrder(id).subscribe((data) => {
      console.log('You undeleted a order');
      console.log(data);
    });
    this.router.navigate(['/ordenes']);
  }
}
