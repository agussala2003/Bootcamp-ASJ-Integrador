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
  constructor(
    public service: OrdenesService,
    public servicioProducto: ProductosyserviciosService,
    public servicioProveedor: ProveedoresService,
    public router: ActivatedRoute,
    public router2: Router
  ) {}

  idOrden: string = '';
  userState: any;
  proveedores: Proveedor[] = [];
  productos: ProductoyServicio[] = [];
  prod: any = '';
  cant: any = '';
  flagCode: boolean = true;
  isActiveOrden: any = false;
  isProductsInOrden: any = false;
  agregarActualizar: string = '';
  isNumberCode:boolean = true;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idOrden = data['idOrden'];
      if (this.idOrden !== undefined) {
        // Verificamos si estamos editando uno
        this.service.getProdData(this.idOrden);
        console.log(this.service.datosOrd);
        alert('Vas a editar el producto ' + this.idOrden);
        this.isProductsInOrden = true;
        this.flagCode = false;
        this.agregarActualizar = 'Actualizar';
      } else {
        // Verificamos si estamos creando uno
        this.flagCode = true;
        this.agregarActualizar = 'Agregar';
        resetearLista(this.service.datosOrd);
      }
    });
    // Verficamos el estado del usuario
    this.userState = this.service.getUserState();
    // Obtenemos los proveedores y filtramos por los que estan activos
    this.servicioProveedor.getFakeData().subscribe((data: Proveedor[]) => {
      this.proveedores = data;
      this.proveedores = this.proveedores.filter(
        (proveedor: Proveedor) => proveedor.Activo
      );
    });
  }
  // Agregamos una orden
  agregarOrden(form: NgForm) {
    this.calcularTotal();
    this.service.uploadFakeData().subscribe((data) => {
      console.log('Agregaste o actualizaste' + data);
    });
    form.reset();
    this.router2.navigate(['/ordenes']);
  }
  // Buscamos los productos que ofrece un proveedor
  searchProds(proveedor: string) {
    this.servicioProducto
      .getFakeData()
      .subscribe((data: ProductoyServicio[]) => {
        const arrProd: ProductoyServicio[] = data;
        this.productos = arrProd.filter(
          (item: ProductoyServicio) => item.Activo === true
        );
        this.productos = this.productos.filter(
          (item: ProductoyServicio) => item.Proveedor === proveedor
        );
      });
  }
  // Se agrega un producto a la orden
  agregarProd() {
    // Obtenemos el array para luego obtener el precio
    const searchArr: ProductoyServicio[] = this.productos.filter(
      (item: ProductoyServicio) => item.id === this.prod
    );
    const nuevoProducto: CalcOrden = {
      Sku: this.prod,
      Cantidad: this.cant,
      Nombre: searchArr[0].Producto,
      Subtotal: searchArr[0].Precio,
    };
    // Enviamos los productos
    console.log(nuevoProducto);
    this.service.datosOrd.Productos.push(nuevoProducto);
    console.log('Listado de Productos:');
    this.service.datosOrd.Productos.forEach((producto) => {
      console.log(
        `SKU: ${producto.Sku}, Cantidad: ${producto.Cantidad}, Subtotal: ${producto.Subtotal}`
      );
    });
    this.validacionProveedor();
    this.calcularTotal();
  }
  // Sacamos el producto en la orden
  deleteProd(i: number) {
    this.service.datosOrd.Productos.splice(i, 1);
    this.validacionProveedor();
    this.calcularTotal();
  }
  // Se calcula el total
  calcularTotal() {
    const totalCalculado = this.service.datosOrd.Productos.reduce(
      (total, producto) => {
        const cantidad = parseInt(producto.Cantidad, 10);
        const subtotal = parseFloat(producto.Subtotal);
        if (!isNaN(cantidad) && !isNaN(subtotal)) {
          return total + cantidad * subtotal;
        }
        return total;
      },
      0
    );
    this.service.datosOrd.Total = totalCalculado.toFixed(2);
    console.log('Total Calculado:', this.service.datosOrd.Total);
  }
  // Verificamos si la orden ya existe
  ordenExists() {
    if (this.idOrden === undefined) {
      if (!/^\d+$/.test(this.service.datosOrd.id)) {
        // El código no es numérico, puedes manejar la lógica correspondiente aquí
        console.log('El código debe ser numérico');
        this.isNumberCode = false;
    } else {
      this.isNumberCode = true;
    }
      this.service.getFakeData().subscribe((data: Orden[]) => {
        const ords = data;
        this.isActiveOrden = ords.find(
          (item: Orden) => item.id === this.service.datosOrd.id
        );
        return this.isActiveOrden;
      });
    }
  }
  //

  // Validacion para que sea solo 1 proveedor
  validacionProveedor() {
    this.service.datosOrd.Productos.length > 0
      ? (this.isProductsInOrden = true)
      : (this.isProductsInOrden = false);
  }
}

function resetearLista(lista: Orden) {
  lista.Emision = '';
  lista.Entrega = '';
  lista.InfoRecepcion = '';
  lista.id = '';
  lista.Productos = [];
  lista.Proveedor = '';
  lista.Activo = true;
}
