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
export class FormProductosyserviciosComponent implements OnInit {
  constructor(
    public service: ProductosyserviciosService,
    public router: ActivatedRoute,
    public servicioProveedor: ProveedoresService,
    public router2: Router
  ) {}

  idProdServ: string = '';
  userState: any;
  proveedores: Proveedor[] = [];
  categorias: any[] = [
    'Electronica',
    'Informatica',
    'Comidas',
    'Bebidas',
    'Moda',
    'Hogar',
  ];

  flagCode: boolean = true;
  isActiveSku: any = false;
  agregarActualizar: string = '';
  isNumberCode: boolean = true;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProdServ = data['idProdServ'];
      if (this.idProdServ !== undefined) {
        // Verficamos si es uno editado
        this.service.getProdData(this.idProdServ);
        alert('Vas a editar el producto ' + this.idProdServ);
        this.flagCode = false;
        this.agregarActualizar = 'Actualizar';
      } else {
        // Verificamos si es uno nuevo
        this.flagCode = true;
        this.agregarActualizar = 'Agregar';
        // Se resetea la lista cada vez que se quiera ingresar uno nuevo
        resetearLista(this.service.datosProd);
      }
    });
    //Obtenemos el estado del usuario
    this.userState = this.service.getUserState();
    //Obtenemos los proveedores ACTIVOS para poder ser seleccionados
    this.servicioProveedor.getFakeData().subscribe((data: Proveedor[]) => {
      this.proveedores = data;
      this.proveedores = this.proveedores.filter(
        (proveedor: Proveedor) => proveedor.Activo
      );
    });
  }
  // Agregamos un producto o servicio
  agregarProductoyservicio(form: NgForm) {
    this.service.uploadFakeData().subscribe((data) => {
      console.log('Agregaste o actualizate' + data);
    });
    form.reset();
    this.router2.navigate(['/productos-servicios']);
  }
  // Validamos si ya existe el SKU al momento de ingresar uno
  skuExists() {
    if (this.idProdServ === undefined) {
        // Agregar la validación de que el código sea numérico
        if (!/^\d+$/.test(this.service.datosProd.id)) {
            // El código no es numérico, puedes manejar la lógica correspondiente aquí
            console.log('El código debe ser numérico');
            this.isNumberCode = false;
        } else {
          this.isNumberCode = true;
        }
        this.service.getFakeData().subscribe((data: ProductoyServicio[]) => {
            const prods = data;
            this.isActiveSku = prods.find(
                (item: ProductoyServicio) => item.id === this.service.datosProd.id
            );
        });
    }
  }
}
function resetearLista(lista: ProductoyServicio) {
  lista.Categoria = '';
  lista.Descripcion = '';
  lista.Imagen = '';
  lista.Precio = '';
  lista.Producto = '';
  lista.Proveedor = '';
  lista.id = '';
}
