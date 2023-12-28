import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form-proveedores.component.html',
  styleUrl: './form-proveedores.component.css',
})
export class FormProveedoresComponent implements OnInit {
  constructor(
    public service: ProveedoresService,
    public router: ActivatedRoute,
    public router2: Router
  ) {}

  idProv: string = '';
  paises: any[] = [];
  provincias: any[] = [];
  userState: any;
  flagCode: boolean = true;
  existsCode: any = false;
  isCuit: any = true;
  agregarActualizar: string = '';

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProv = data['idProv'];
      if (this.idProv !== undefined) {
        // Verifico si estamos editando
        this.service.getProvData(this.idProv);
        alert('Vas a editar el proveedor ' + this.idProv);
        // Cambiamos estas variables para el momento de actualizar
        this.flagCode = false;
        this.agregarActualizar = 'Actualizar';
      } else {
        // Verifico si estamos es uno nuevo
        // Cambiamos estas variables para el momento de agregar
        this.flagCode = true;
        this.agregarActualizar = 'Agregar';
        resetearLista(this.service.datosProv);
      }
    });
    // Obtenemos la informacion de todos los paises
    this.service.getCountryData().subscribe((data: any) => {
      this.paises = data.countries;
    });
    // Obtenemos el estado del usuario
    this.userState = this.service.getUserState();
  }
  // Buscamos las provincias de cada pais
  buscarPais(pais: string) {
    this.service.getStateData().subscribe((data: any) => {
      const idPais = this.paises.find((item) => item.name === pais).id;
      if (idPais != null) {
        this.provincias = data.states.filter(
          (item: any) => item.id_country === idPais
        );
      }
    });
  }
  // Se agrega el proveedor
  agregarProveedor(form: NgForm) {
    this.service.uploadFakeData().subscribe((data) => {
      console.log('Agregaste o actualizaste', data);
    });
    form.reset();
    // Navegamos sin resetear
    this.router2.navigate(['/proveedores']);
  }
  // Se valida que al momento de ingresar uno nuevo no sea uno que ya existe
  codProvExists(): any {
    if (this.idProv === undefined) {
      this.service.getFakeData().subscribe((data: Proveedor[]) => {
        console.log(data);
        const provs: Proveedor[] = data;
        this.existsCode = provs.find(
          (item: Proveedor) => item.id === this.service.datosProv.id
        );
        return this.existsCode;
      });
    }
  }
  // Validamos que sea un cuit
  isCuitValidation() {
    if (this.idProv === undefined) {
      const fullCuit = this.service.datosProv.DatosFiscales.CUIT;
      // Verifica la longitud y la presencia de guiones
      if (fullCuit.length === 13 && fullCuit.includes('-')) {
        // Divide el CUIT en partes usando los guiones
        const arrCuit = fullCuit.split('-');
        // Verifica que haya tres partes después de dividir
        if (arrCuit.length === 3) {
          const [firstPart, secondPart, thirdPart] = arrCuit;
          // Validación de que todas las partes sean números
          if (
            this.isNumber(firstPart) &&
            this.isNumber(secondPart) &&
            this.isNumber(thirdPart) &&
            this.isValidTwoDigitNumber(firstPart) &&
            this.isValidEightDigitNumber(secondPart) &&
            this.isValidSingleDigitNumber(thirdPart)
          ) {
            this.isCuit = true;
            console.log('El CUIT es válido:', fullCuit);
          } else {
            console.log(
              'El CUIT no es válido. Al menos una parte no es un número válido.'
            );
            this.isCuit = false;
          }
        } else {
          console.log(
            'El CUIT no es válido. No hay tres partes después de dividir.'
          );
          this.isCuit = false;
        }
      } else {
        console.log('El CUIT no es válido. Longitud incorrecta o falta guión.');
        this.isCuit = false;
      }
    }
  }
  // Métodos de validación
  private isNumber(str: string): boolean {
    return /^\d+$/.test(str);
  }
  private isValidTwoDigitNumber(str: string): boolean {
    return /^\d{2}$/.test(str);
  }
  private isValidEightDigitNumber(str: string): boolean {
    return /^\d{8}$/.test(str);
  }
  private isValidSingleDigitNumber(str: string): boolean {
    return /^\d{1}$/.test(str);
  }
}

function resetearLista(lista: Proveedor) {
  lista.id = '';
  lista.RazonSocial = '';
  lista.Rubro = '';
  lista.Telefono = '';
  lista.Email = '';
  lista.SitioWeb = '';
  lista.Imagen = '';
  lista.Direccion.Calle = '';
  lista.Direccion.Numero = '';
  lista.Direccion.CP = '';
  lista.Direccion.Localidad = '';
  lista.Direccion.Provincia = '';
  lista.Direccion.Pais = '';
  lista.DatosFiscales.CUIT = '';
  lista.DatosFiscales.CondicionIVA = '';
  lista.DatosContacto.Nombre = '';
  lista.DatosContacto.Apellido = '';
  lista.DatosContacto.Telefono = '';
  lista.DatosContacto.Email = '';
  lista.DatosContacto.Rol = '';
}
