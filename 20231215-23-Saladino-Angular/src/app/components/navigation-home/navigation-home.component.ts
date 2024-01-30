import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/proveedores.service';
import { ProductService } from '../../services/productosyservicios.service';
import { OrderService } from '../../services/ordenes.service';
import { Supplier } from '../../models/Supplier';
import { Product } from '../../models/Product';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-navigation-home',
  templateUrl: './navigation-home.component.html',
  styleUrl: './navigation-home.component.css'
})
export class NavigationHomeComponent implements OnInit {
  constructor(private supplierService: SupplierService,private productService: ProductService, private orderService:OrderService) { }
  valor:any = true;
  suppliers:Supplier[] = [];
  products:Product[] = [];
  orders:Order[] = [];
  ngOnInit(): void {
    this.getActiveSuppliers();
    this.getActiveProducts();
    this.getActiveOrders();
    const location = (window.location.pathname === '/inicio')
    if (!location) {
      this.valor = JSON.parse(
        localStorage.getItem('inicio') || 'null'
      );
      this.valor !== null ? this.valor : null;
    }
  }

  getActiveSuppliers(){
    this.supplierService.getActiveSuppliers().subscribe((data: Supplier[]) => {
        this.suppliers = data;
      });
  }

  getActiveProducts(){
    this.productService.getActiveProducts().subscribe((data: Product[]) => {
        this.products = data;
      });
  }

  getActiveOrders(){
    this.orderService.getActiveOrders().subscribe((data: Order[]) => {
        this.orders = data;
      });
  }

}
