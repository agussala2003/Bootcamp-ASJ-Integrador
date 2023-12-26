import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPrincipalComponent } from './components/main-principal/main-principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablaProveedoresComponent } from './components/main-proveedores/tabla-proveedores/tabla-proveedores.component';
import { FormProveedoresComponent } from './components/main-proveedores/form-proveedores/form-proveedores.component';
import { FormProductosyserviciosComponent } from './components/main-productosyservicios/form-productosyservicios/form-productosyservicios.component';
import { TablaProductosyserviciosComponent } from './components/main-productosyservicios/tabla-productosyservicios/tabla-productosyservicios.component';
import { TablaOrdenesdecompraComponent } from './components/main-ordenesdecompra/tabla-ordenesdecompra/tabla-ordenesdecompra.component';
import { FormOrdenesdecompraComponent } from './components/main-ordenesdecompra/form-ordenesdecompra/form-ordenesdecompra.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './components/main-proveedores/detalle/detalle.component';
import { LoginComponent } from './components/login/login.component';
import { DetalleProdComponent } from './components/main-productosyservicios/detalle-prod/detalle-prod.component';
import { AtoZPipe } from './pipes/ato-z.pipe';
import { DetalleOrdenesComponent } from './components/main-ordenesdecompra/detalle-ordenes/detalle-ordenes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainPrincipalComponent,
    TablaProveedoresComponent,
    FormProveedoresComponent,
    FormProductosyserviciosComponent,
    TablaProductosyserviciosComponent,
    TablaOrdenesdecompraComponent,
    FormOrdenesdecompraComponent,
    DetalleComponent,
    LoginComponent,
    DetalleProdComponent,
    AtoZPipe,
    DetalleOrdenesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
