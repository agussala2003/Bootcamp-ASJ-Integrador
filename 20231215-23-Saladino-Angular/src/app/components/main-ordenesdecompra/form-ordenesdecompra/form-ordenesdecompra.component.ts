import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../../services/ordenes.service';
import { CalcOrden, Orden } from '../../../models/Orden';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';
import { NgForm } from '@angular/forms';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';

@Component({
  selector: 'app-form-ordenesdecompra',
  templateUrl: './form-ordenesdecompra.component.html',
  styleUrl: './form-ordenesdecompra.component.css',
})
export class FormOrdenesdecompraComponent implements OnInit {
  constructor(public service: OrdenesService,public servicioProducto:ProductosyserviciosService,public servicioProveedor:ProveedoresService,public router: ActivatedRoute,public router2:Router) {}
  idOrden:string = '';
  userState:any;
  proveedores:Proveedor[] = [];
  productos:ProductoyServicio[] = [];
  prod:any = '';
  cant:any = '';
  flagCode:boolean = true;
  ngOnInit(): void {
    this.router.params.subscribe(data => {
      this.idOrden = data['idOrden'];
      if(this.idOrden !== undefined) {
        this.service.getProdData(this.idOrden);
        alert('Vas a editar el producto ' + this.idOrden);
        this.flagCode = false;
      } else {
        this.flagCode = true;
        resetearLista(this.service.datosOrd);
      }
    })
    this.userState = this.service.getUserState();
    this.proveedores = this.servicioProveedor.getFakeData();
  }
  agregarOrden(form:NgForm) {
      this.service.uploadFakeData();
      form.reset();
      this.router2.navigate(['/ordenes']);
  }
  searchProds(proveedor:string) {
    const arrProd:ProductoyServicio[] = this.servicioProducto.getFakeData()
    this.productos = arrProd.filter((item:ProductoyServicio) => item.Proveedor === proveedor);
  }
  agregarProd() {
    const searchArr: ProductoyServicio[] = this.productos.filter((item: ProductoyServicio) => item.Sku === this.prod);
    const nuevoProducto: CalcOrden = {
      Sku: this.prod,
      Cantidad: this.cant,
      Subtotal: searchArr[0].Precio
    };
    this.service.datosOrd.Productos.push(nuevoProducto);
    console.log('Listado de Productos:');
    this.service.datosOrd.Productos.forEach(producto => {
      console.log(`SKU: ${producto.Sku}, Cantidad: ${producto.Cantidad}, Subtotal: ${producto.Subtotal}`);
    });
    this.calcularTotal();
  }
  deleteProd(i:number) {
    if(this.service.datosOrd.Productos.length > 1) {
      this.service.datosOrd.Productos.splice(i,1)
    } else {
      alert('Debes tener al menos 1 producto cargado')
    }
  }
  calcularTotal() {
    const totalCalculado = this.service.datosOrd.Productos.reduce((total, producto) => {
      const cantidad = parseInt(producto.Cantidad, 10);
      const subtotal = parseFloat(producto.Subtotal);
      if (!isNaN(cantidad) && !isNaN(subtotal)) {
        return total + cantidad * subtotal;
      }
      return total;
    }, 0);
    this.service.datosOrd.Total = totalCalculado.toFixed(2);
    console.log('Total Calculado:', this.service.datosOrd.Total);
  }  
}
function resetearLista (lista:Orden){
  lista.Emision = '';
  lista.Entrega = '';
  lista.InfoRecepcion = '';
  lista.Orden = '';
  lista.Productos = [];
  lista.Proveedor = '';
  lista.Activo = true;
}