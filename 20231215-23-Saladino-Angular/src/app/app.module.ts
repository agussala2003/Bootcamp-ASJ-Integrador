import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPrincipalComponent } from './components/main-principal/main-principal.component';
import { MainProveedoresComponent } from './components/main-proveedores/main-proveedores.component';
import { MainProductosyserviciosComponent } from './components/main-productosyservicios/main-productosyservicios.component';
import { MainOrdenesdecompraComponent } from './components/main-ordenesdecompra/main-ordenesdecompra.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablaProveedoresComponent } from './components/main-proveedores/tabla-proveedores/tabla-proveedores.component';
import { FormProveedoresComponent } from './components/main-proveedores/form-proveedores/form-proveedores.component';
import { FormProductosyserviciosComponent } from './components/main-productosyservicios/form-productosyservicios/form-productosyservicios.component';
import { TablaProductosyserviciosComponent } from './components/main-productosyservicios/tabla-productosyservicios/tabla-productosyservicios.component';
import { TablaOrdenesdecompraComponent } from './components/main-ordenesdecompra/tabla-ordenesdecompra/tabla-ordenesdecompra.component';
import { FormOrdenesdecompraComponent } from './components/main-ordenesdecompra/form-ordenesdecompra/form-ordenesdecompra.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainPrincipalComponent,
    MainProveedoresComponent,
    MainProductosyserviciosComponent,
    MainOrdenesdecompraComponent,
    TablaProveedoresComponent,
    FormProveedoresComponent,
    FormProductosyserviciosComponent,
    TablaProductosyserviciosComponent,
    TablaOrdenesdecompraComponent,
    FormOrdenesdecompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
