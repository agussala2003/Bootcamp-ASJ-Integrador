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
import { DetalleProdComponent } from './components/main-productosyservicios/detalle-prod/detalle-prod.component';
import { DetalleOrdenesComponent } from './components/main-ordenesdecompra/detalle-ordenes/detalle-ordenes.component';
import { TablaCategoriasComponent } from './components/main-categorias/tabla-categorias/tabla-categorias.component';
import { FormCategoriasComponent } from './components/main-categorias/form-categorias/form-categorias.component';
import { TablaRubrosComponent } from './components/main-rubros/tabla-rubros/tabla-rubros.component';
import { FormRubrosComponent } from './components/main-rubros/form-rubros/form-rubros.component';

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
        path: "form/:idSupplier",
        component: FormProveedoresComponent
      },
      {
        path: "form",
        component: FormProveedoresComponent
      },
      {
        path: "detalle/:idSupplier",
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
        path: "form/:idProduct",
        component: FormProductosyserviciosComponent
      },
      {
        path: "form",
        component: FormProductosyserviciosComponent
      },
      {
        path: "detalle/:idProduct",
        component: DetalleProdComponent
      },
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
        path: "form/:idOrder",
        component: FormOrdenesdecompraComponent
      },
      {
        path: "form",
        component: FormOrdenesdecompraComponent
      },
      {
        path: "detalle/:idOrder",
        component: DetalleOrdenesComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'categorias',
    children: [
      {
        path:'',
        component:TablaCategoriasComponent
      },
      {
        path:'form',
        component:FormCategoriasComponent
      },
    ]
  },
  {
    path: 'rubros',
    children: [
      {
        path:'',
        component:TablaRubrosComponent
      },
      {
        path:'form',
        component:FormRubrosComponent
      },
    ]
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
