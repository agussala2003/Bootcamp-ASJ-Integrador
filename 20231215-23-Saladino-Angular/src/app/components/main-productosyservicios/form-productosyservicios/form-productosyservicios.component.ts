import { Component, OnInit } from '@angular/core';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '../../../models/Proveedor';
import { ProveedoresService } from '../../../services/proveedores.service';

@Component({
  selector: 'app-form-productosyservicios',
  templateUrl: './form-productosyservicios.component.html',
  styleUrl: './form-productosyservicios.component.css',
})
export class FormProductosyserviciosComponent implements OnInit{
  constructor(public service: ProductosyserviciosService,public router:ActivatedRoute,public servicioProveedor: ProveedoresService,public router2:Router) {}
  idProdServ:string = '';
  userState:any;
  proveedores:Proveedor[] = [];
  categorias: any[] = ['Electronica','Informatica','Comidas','Bebidas','Moda','Hogar'];
  flagCode:boolean = true;
  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.idProdServ = data['idProdServ'];
      if(this.idProdServ !== undefined) {
        this.service.getProdData(this.idProdServ);
        alert('Vas a editar el producto ' + this.idProdServ)
        this.flagCode = false;
      } else {
        this.flagCode = true;
        resetearLista(this.service.datosProd);
      }
    })
    this.userState = this.service.getUserState();
    this.proveedores = this.servicioProveedor.getFakeData();
  }
  agregarProductoyservicio(form:NgForm) {
    this.service.uploadFakeData();
    form.reset();
    this.router2.navigate(['/productos-servicios']);
  }
}
function resetearLista (lista:ProductoyServicio) {
  lista.Categoria = '';
  lista.Descripcion = '';
  lista.Imagen = '';
  lista.Precio = '';
  lista.Producto = '';
  lista.Proveedor = '';
  lista.Sku = '';
}
