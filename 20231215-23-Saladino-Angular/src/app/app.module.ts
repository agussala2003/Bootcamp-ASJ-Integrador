import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPrincipalComponent } from './components/main-principal/main-principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableSupplierComponent } from './components/main-proveedores/table-supplier/table-supplier.component';
import { FormSupplierComponent } from './components/main-proveedores/form-supplier/form-supplier.component';
import { FormProductsComponent } from './components/main-productosyservicios/form-products/form-products.component';
import { TableProductsComponent } from './components/main-productosyservicios/table-products/table-products.component';
import { TableOrdersComponent } from './components/main-ordenesdecompra/table-orders/table-orders.component';
import { FormOrdersComponent } from './components/main-ordenesdecompra/form-orders/form-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetailSupplierComponent } from './components/main-proveedores/detail-supplier/detail-supplier.component';
import { LoginComponent } from './components/login/login.component';
import { DetailProductsComponent } from './components/main-productosyservicios/detail-products/detail-products.component';
import { AtoZPipe } from './pipes/ato-z.pipe';
import { DetailOrdersComponent } from './components/main-ordenesdecompra/detail-orders/detail-orders.component';
import { NavigationHomeComponent } from './components/navigation-home/navigation-home.component';
import { TableIndustriesComponent } from './components/main-rubros/table-industries/table-industries.component';
import { TableCategoriesComponent } from './components/main-categorias/table-categories/table-categories.component';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { LoaderComponent } from './components/loader/loader.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegisterComponent } from './components/register/register.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainPrincipalComponent,
    TableSupplierComponent,
    FormSupplierComponent,
    FormProductsComponent,
    TableProductsComponent,
    TableOrdersComponent,
    FormOrdersComponent,
    DetailSupplierComponent,
    LoginComponent,
    DetailProductsComponent,
    AtoZPipe,
    DetailOrdersComponent,
    NavigationHomeComponent,
    TableIndustriesComponent,
    TableCategoriesComponent,
    EmptyListComponent,
    SearchPipe,
    PaginationPipe,
    LoaderComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
