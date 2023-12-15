import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPrincipalComponent } from './components/main-principal/main-principal.component';
import { MainProveedoresComponent } from './components/main-proveedores/main-proveedores.component';
import { MainProductosyserviciosComponent } from './components/main-productosyservicios/main-productosyservicios.component';
import { MainOrdenesdecompraComponent } from './components/main-ordenesdecompra/main-ordenesdecompra.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: MainPrincipalComponent
  },
  {
    path: 'proveedores',
    component: MainProveedoresComponent
  },
  {
    path: 'productos-servicios',
    component: MainProductosyserviciosComponent
  },
  {
    path: 'ordenes',
    component: MainOrdenesdecompraComponent
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
