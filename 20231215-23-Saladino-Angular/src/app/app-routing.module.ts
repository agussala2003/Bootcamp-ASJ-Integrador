import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPrincipalComponent } from './components/main-principal/main-principal.component';
import { FormSupplierComponent } from './components/main-proveedores/form-supplier/form-supplier.component';
import { TableSupplierComponent } from './components/main-proveedores/table-supplier/table-supplier.component';
import { TableProductsComponent } from './components/main-productosyservicios/table-products/table-products.component';
import { FormProductsComponent } from './components/main-productosyservicios/form-products/form-products.component';
import { TableOrdersComponent } from './components/main-ordenesdecompra/table-orders/table-orders.component';
import { FormOrdersComponent } from './components/main-ordenesdecompra/form-orders/form-orders.component';
import { DetailSupplierComponent } from './components/main-proveedores/detail-supplier/detail-supplier.component';
import { LoginComponent } from './components/login/login.component';
import { DetailProductsComponent } from './components/main-productosyservicios/detail-products/detail-products.component';
import { DetailOrdersComponent } from './components/main-ordenesdecompra/detail-orders/detail-orders.component';
import { TableCategoriesComponent } from './components/main-categorias/table-categories/table-categories.component';
import { TableIndustriesComponent } from './components/main-rubros/table-industries/table-industries.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: MainPrincipalComponent
  },
  {
    path: 'proveedores',
    children: [ 
      {
        path: "",
        component: TableSupplierComponent
      },
      {
        path: "form/:idSupplier",
        component: FormSupplierComponent
      },
      {
        path: "form",
        component: FormSupplierComponent
      },
      {
        path: "detalle/:idSupplier",
        component: DetailSupplierComponent
      },
    ]
  },
  {
    path: 'productos-servicios',
    children: [ 
      {
        path: "",
        component: TableProductsComponent
      },
      {
        path: "form/:idProduct",
        component: FormProductsComponent
      },
      {
        path: "form",
        component: FormProductsComponent
      },
      {
        path: "detalle/:idProduct",
        component: DetailProductsComponent
      },
    ]
  },
  {
    path: 'ordenes',
    children: [ 
      {
        path: "",
        component: TableOrdersComponent
      },
      {
        path: "form/:idOrder",
        component: FormOrdersComponent
      },
      {
        path: "form",
        component: FormOrdersComponent
      },
      {
        path: "detalle/:idOrder",
        component: DetailOrdersComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'categorias',
    component: TableCategoriesComponent
  },
  {
    path: 'rubros',
    component: TableIndustriesComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login' //Aqui va el componente
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
