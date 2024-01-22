import { Component, OnInit } from '@angular/core';
import { ProductoyServicio } from '../../../models/ProductoyServicio';
import { ProductosyserviciosService } from '../../../services/productosyservicios.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '../../../models/Proveedor';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Categoria } from '../../../models/Categoria';
import { CategoriasService } from '../../../services/categorias.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-form-productosyservicios',
  templateUrl: './form-productosyservicios.component.html',
  styleUrl: './form-productosyservicios.component.css',
})
export class FormProductosyserviciosComponent implements OnInit {
  constructor(
    public service: ProductosyserviciosService,
    public router: ActivatedRoute,
    public servicioProveedor: ProveedoresService,
    public router2: Router,
    public servicioCategoria:CategoriasService,
    public modalService: NgbModal
  ) {}

  datosProd: ProductoyServicio = {
    Proveedor: '',
    id: '',
    Categoria: '',
    Producto: '',
    Descripcion: '',
    Precio: '',
    Imagen: '',
    Activo: true,
  };

  idProdServ: string = '';
  userState: any;
  proveedores: Proveedor[] = [];
  categorias: Categoria[] = [];
  productos: ProductoyServicio[] = [];
  isActiveSku: any = false;

  flagCode: boolean = true;
  isNumberCode: boolean = true;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProdServ = data['idProdServ'];
      if (this.idProdServ !== undefined) {
        this.loadProductoData();
      } else {
        this.setupNewProduct();
      }
    });

    this.userState = this.service.getUserState();

    this.servicioProveedor.getFakeData().subscribe((data: Proveedor[]) => {
      this.proveedores = data.filter((proveedor: Proveedor) => proveedor.Activo);
    });

    this.servicioCategoria.getFakeData().subscribe((data:Categoria[]) =>{
      this.categorias = data
    });

    this.service.getFakeData().subscribe((data: ProductoyServicio[]) => {
      this.productos = data;
    });
  }

  loadProductoData(){
    this.service.getProdData(this.idProdServ).subscribe((data: ProductoyServicio) => {
      this.datosProd = data;
    });
    this.flagCode = false;
  }
  setupNewProduct(){
    this.flagCode = true;
    this.resetProductoData();
  }

  agregarProductoyservicio(form: NgForm) {
    if(this.validarFormulario()){
      this.service.uploadFakeData(this.datosProd).subscribe((data) => {
        console.log('Agregaste o actualizate' + data);
      });
      form.reset();
      this.router2.navigate(['/productos-servicios']);
    } else {
      this.openModal('No cumples con las condiciones');
    }
  }

  validarFormulario():boolean {
    if(!this.validarCodigoNumericoDe8Digitos(this.datosProd.id) ||
    this.datosProd.Proveedor === 'Selecciona un proveedor' ||
    this.datosProd.Categoria === 'Selecciona una categoria' ||
    !this.validarStringAlfanumericoEntre3y50Caracteres(this.datosProd.Producto) ||
    !this.validarStringAlfanumericoEntre15y250Caracteres(this.datosProd.Descripcion) ||
    parseInt(this.datosProd.Precio) < 1 ||
    !this.validarUrl(this.datosProd.Imagen)
    ){
      return false;
    }
    return true;
  }

  validarCodigoNumericoDe8Digitos(str: string): boolean {
    const regex = /^[0-9]{8}$/;
    return regex.test(str);
  }
  validarStringAlfanumericoEntre3y50Caracteres(str: string): boolean {
    const regex = /^[0-9 A-Z a-z]{3,50}$/;
    return regex.test(str);
  }
  validarStringAlfanumericoEntre15y250Caracteres(str: string): boolean {
    const long = str.length
    return long > 14;
  }
  validarUrl(sitioWeb: string): boolean {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(sitioWeb);
  }
  
  skuExists() {
    if (this.idProdServ === undefined) {
      if (!/^\d+$/.test(this.datosProd.id)) {
        console.log('El código debe ser numérico');
        this.isNumberCode = false;
      } else {
        this.isNumberCode = true;
      }

      this.isActiveSku = this.productos.some((item: ProductoyServicio) => item.id === this.datosProd.id);
    }
  }

  resetProductoData(){
    this.datosProd = {
      Proveedor: '',
      id: '',
      Categoria: '',
      Producto: '',
      Descripcion: '',
      Precio: '',
      Imagen: '',
      Activo: true,
    };
  }

  openModal(aviso: string = "Informacion del formulario") {
    const mensajes: string[] = [];
  
    mensajes.push('Todos los campos son obligatorios.');
    mensajes.push('Completar todos los campos correctamente.');
    mensajes.push('Respeta los formatos ejemplificados.');
    mensajes.push('Evita dejar espacios en el comienzo, final o entre palabras.');
    mensajes.push('El código debe ser numérico y contener exactamente 8 dígitos.');
    mensajes.push('La Imagen debe comenzar con "https://" y seguir un formato válido.');
    mensajes.push('Ingresa un código que no exista.');
  
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.listado = mensajes;
    modalRef.componentInstance.aviso = aviso;
  }
  
}
