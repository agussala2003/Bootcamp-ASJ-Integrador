import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { Supplier } from '../../models/Supplier';
import { Product } from '../../models/Product';
import { Order } from '../../models/Order';
import { LoginService } from '../../services/login.service';

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
    private loginService: LoginService
  ) {}
  userState: any = true;
  suppliers: Supplier[] = [];
  products: Product[] = [];
  orders: Order[] = [];
  ngOnInit(): void {
    this.getActiveSuppliers();
    this.getActiveProducts();
    this.getActiveOrders();
    const location = window.location.pathname === '/inicio';
    if (!location) {
      this.userState = this.loginService.getUserState();
    }
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
}
