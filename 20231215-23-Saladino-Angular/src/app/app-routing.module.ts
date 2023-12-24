import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPrincipalComponent } from './components/main-principal/main-principal.component';
import { FormProveedoresComponent } from './components/main-proveedores/form-proveedores/form-proveedores.component';
import { TablaProveedoresComponent } from './components/main-proveedores/tabla-proveedores/tabla-proveedores.component';
import { TablaProductosyserviciosComponent } from './components/main-productosyservicios/tabla-productosyservicios/tabla-productosyservicios.component';
import { FormProductosyserviciosComponent } from './components/main-productosyservicios/form-productosyservicios/form-productosyservicios.component';
import { TablaOrdenesdecompraComponent } from './components/main-ordenesdecompra/tabla-ordenesdecompra/tabla-ordenesdecompra.component';
import { FormOrdenesdecompraComponent } from './components/main-ordenesdecompra/form-ordenesdecompra/form-ordenesdecompra.component';
import { DetalleComponent } from './components/main-proveedores/detalle/detalle.component';
import { LoginComponent } from './components/login/login.component';

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
        component: TablaProveedoresComponent
      },
      {
        path: "form/:idProv",
        component: FormProveedoresComponent
      },
      {
        path: "form",
        component: FormProveedoresComponent
      },
      {
        path: "detalle/:idProv",
        component: DetalleComponent
      },
    ]
  },
  {
    path: 'productos-servicios',
    children: [ 
      {
        path: "",
        component: TablaProductosyserviciosComponent
      },
      {
        path: "form/:idProdServ",
        component: FormProductosyserviciosComponent
      }
    ]
  },
  {
    path: 'ordenes',
    children: [ 
      {
        path: "",
        component: TablaOrdenesdecompraComponent
      },
      {
        path: "form/:idOrden",
        component: FormOrdenesdecompraComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio' //Aqui va el componente
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
