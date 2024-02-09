import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { Supplier } from '../../models/Supplier';
import { Product } from '../../models/Product';
import { Order } from '../../models/Order';
import { LoginService } from '../../services/login.service';
import { OrderDetailService } from '../../services/order-detail.service';
import { TopSuppliers } from '../../models/TopSuppliers';
import { TopProducts } from '../../models/TopProducts';

@Component({
  selector: 'app-navigation-home',
  templateUrl: './navigation-home.component.html',
  styleUrl: './navigation-home.component.css',
})
export class NavigationHomeComponent implements OnInit {

  constructor(
    private supplierService: SupplierService,
    private productService: ProductService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private loginService: LoginService
  ) {}

  userState: any = true;
  location: any = window.location.pathname === '/inicio';
  suppliers: Supplier[] = [];
  products: Product[] = [];
  orders: Order[] = [];
  topSuppliers: TopSuppliers[] = [];
  topProducts: TopProducts[] = [];

  ngOnInit(): void {
    this.getActiveSuppliers();
    this.getActiveProducts();
    this.getActiveOrders();
    this.getTop3Suppliers();
    this.getTop3Products();
    this.location = window.location.pathname === '/inicio';
    this.userState = this.loginService.getUserState();
  }

  getActiveSuppliers() {
    this.supplierService.getActiveSuppliers().subscribe(
      (data: Supplier[]) => {
        this.suppliers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getActiveProducts() {
    this.productService.getActiveProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  getActiveOrders() {
    this.orderService.getActiveOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  getTop3Suppliers() {
    this.orderService.getTop3Suppliers().subscribe((data) => {
      console.log(data);
      this.topSuppliers = data;
    });
  }

  getTop3Products() {
    this.orderDetailService.getTop3Products().subscribe((data) => {
      console.log(data);
      this.topProducts = data;
    });
  }
}
