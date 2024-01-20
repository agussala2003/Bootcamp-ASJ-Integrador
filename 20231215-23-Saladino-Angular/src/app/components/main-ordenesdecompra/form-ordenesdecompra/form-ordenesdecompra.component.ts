import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../../services/ordenes.service';
import { CalcOrden, Orden } from '../../../models/Orden';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';
import { NgForm } from '@angular/forms';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';

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
    public router2: Router,
    public modalService: NgbModal 
  ) {}

  datosOrd: Orden = {
    id: '',
    Emision: '',
    Entrega: '',
    InfoRecepcion: '',
    Proveedor: '',
    Productos: [],
    Activo: true,
    Total: '',
  };

  idOrden: string = '';
  userState: any;
  proveedores: Proveedor[] = [];
  productos: ProductoyServicio[] = [];
  prod: string = '';
  cant: string = '';
  flagCode: boolean = true;
  isActiveOrden: boolean = false;
  isProductsInOrden: boolean = false;
  isNumberCode: boolean = true;
  ords: Orden[] = [];
  today: Date = new Date();

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idOrden = data['idOrden'];
      this.idOrden !== undefined ? this.loadOrdenData() : this.setupNewOrden();
    });

    this.userState = this.service.getUserState();

    this.servicioProveedor
      .getFakeData()
      .subscribe((data: Proveedor[]) => {
        this.proveedores = data.filter((proveedor) => proveedor.Activo);
      });

    this.service.getFakeData().subscribe((data: Orden[]) => {
      this.ords = data;
    });
  }

  loadOrdenData() {
    this.service.getProdData(this.idOrden).subscribe((data: Orden) => {
      this.datosOrd = data;
    });
    this.isProductsInOrden = true;
    this.flagCode = false;
  }

  setupNewOrden() {
    this.flagCode = true;
    this.resetOrden();
  }

  agregarOrden(form: NgForm) {
    if (this.validarFormulario()) {
      this.calcularTotal();
      this.service.uploadFakeData(this.datosOrd).subscribe((data) => {
        console.log('Agregaste o actualizaste' + data);
      });
      form.reset();
      this.router2.navigate(['/ordenes']);
    } else {
      this.openModal('No cumples con las condiciones');
    }
  }

  validarFormulario(): boolean {
    const today = new Date();
    today.setDate(today.getDate() - 1)

    if(!this.validarCodigoNumericoDe1a12Digitos(this.datosOrd.id) ||
    this.datosOrd.Proveedor === 'Selecciona un Sku' ||
    this.validateStringDates(this.datosOrd.Emision, this.datosOrd.Entrega) ||
    !this.validarStringAlfanumericoEntre15y250Caracteres(this.datosOrd.InfoRecepcion)) {
      return false;
    }
    if(this.idOrden === undefined) {
      console.log("que pasa")
      if(new Date(this.datosOrd.Emision) < today) return false;
    }
    return true;

  }

  validarCodigoNumericoDe1a12Digitos(str: string): boolean {
    const regex = /^[0-9]{1,12}$/;
    return regex.test(str);
  }
  validarStringAlfanumericoEntre15y250Caracteres(str: string): boolean {
    const long = str.length
    return long > 14;
  }
  validateStringDates(date: string, currentDate: string): boolean {
    const dateDate = new Date(date);
    const currentDateDate = new Date(currentDate);
    return dateDate >= currentDateDate;
  }
  validacionProveedor() {
    this.isProductsInOrden = this.datosOrd.Productos.length > 0;
  }

  searchProds(proveedor: string) {
    this.servicioProducto.getFakeData().subscribe((data: ProductoyServicio[]) => {
      this.productos = data
        .filter((item) => item.Activo && item.Proveedor === proveedor);
    });
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  agregarProd() {
    const selectedProduct = this.productos.find((item) => item.id === this.prod);
    if (selectedProduct) {
      const nuevoProducto: CalcOrden = {
        Sku: this.prod,
        Cantidad: this.cant,
        Nombre: selectedProduct.Producto,
        Subtotal: selectedProduct.Precio,
      };
      this.datosOrd.Productos.push(nuevoProducto);
      this.validacionProveedor();
      this.calcularTotal();
    }
  }

  deleteProd(index: number) {
    this.datosOrd.Productos.splice(index, 1);
    this.validacionProveedor();
    this.calcularTotal();
  }

  calcularTotal() {
    const totalCalculado = this.datosOrd.Productos.reduce(
      (total, producto) => total + (parseInt(producto.Cantidad, 10) || 0) * parseFloat(producto.Subtotal || '0'),
      0
    );
    this.datosOrd.Total = totalCalculado.toFixed(2);
  }

  ordenExists(): boolean {
    if (this.idOrden === undefined) {
      this.isNumberCode = /^\d+$/.test(this.datosOrd.id);
      this.isActiveOrden = this.ords.some((item) => item.id === this.datosOrd.id);
      return this.isActiveOrden;
    }
    return false;
  }

  openModal(aviso: string = "Informacion del formulario") {
    const mensajes: string[] = [];
  
    mensajes.push('Todos los campos son obligatorios.');
    mensajes.push('Completar todos los campos correctamente.');
    mensajes.push('Respeta los formatos ejemplificados.');
    mensajes.push('Evita dejar espacios en el comienzo, final o entre palabras.');
    mensajes.push('El numero de orden debe ser numérico y contener exactamente 8 dígitos.');
    mensajes.push('Ingresa un numero de orden que no exista.');
    mensajes.push('La fecha de emision debe ser como minmo la fecha actual.');
    mensajes.push('La fecha de entrega debe ser posterior a la de emision.');
  
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.listado = mensajes;
    modalRef.componentInstance.aviso = aviso;
  }

  resetOrden(){
    this.datosOrd = {
      id: '',
      Emision: '',
      Entrega: '',
      InfoRecepcion: '',
      Proveedor: '',
      Productos: [],
      Activo: true,
      Total: '',
    }
  }
}
