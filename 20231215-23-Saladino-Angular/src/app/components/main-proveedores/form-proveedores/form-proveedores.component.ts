import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/Proveedor';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rubro } from '../../../models/Rubro';
import { RubrosService } from '../../../services/rubros.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';


@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form-proveedores.component.html',
  styleUrls: ['./form-proveedores.component.css'],
})
export class FormProveedoresComponent implements OnInit {
  datosProv: Proveedor = {
    id: '',
    RazonSocial: '',
    Rubro: '',
    Telefono: '',
    Email: '',
    SitioWeb: '',
    Imagen: '',
    Activo: true,
    Direccion: {
      Calle: '',
      Numero: '',
      CP: '',
      Localidad: '',
      Provincia: '',
      Pais: '',
    },
    DatosFiscales: {
      CUIT: '',
      CondicionIVA: '',
    },
    DatosContacto: {
      Nombre: '',
      Apellido: '',
      Telefono: '',
      Email: '',
      Rol: '',
    },
  };

  idProv: string = '';
  paises: any[] = [];
  provincias: any[] = [];
  userState: any;
  flagCode: boolean = true;
  existsCode: boolean = false;
  isCuit: boolean = true;
  agregarActualizar: string = '';
  rubros: Rubro[] = [];
  provs: Proveedor[] = [];

  constructor(
    public service: ProveedoresService,
    public router: ActivatedRoute,
    public router2: Router,
    public servicioRubro: RubrosService,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idProv = data['idProv'];
      if (this.idProv !== undefined) {
        this.loadProveedorData();
      } else {
        this.setupNewProveedor();
      }
    });

    this.service.getCountryData().subscribe((data: any) => {
      this.paises = data.countries;
    });

    this.userState = this.service.getUserState();

    this.servicioRubro.getFakeData().subscribe((data: Rubro[]) => {
      this.rubros = data;
    });

    this.service.getFakeData().subscribe((data: Proveedor[]) => {
      this.provs = data;
    });
  }

  loadProveedorData(): void {
    this.service.getProvData(this.idProv).subscribe((data: Proveedor) => {
      this.datosProv = data;
    });

    this.flagCode = false;
    this.agregarActualizar = 'Actualizar';
  }

  setupNewProveedor(): void {
    this.flagCode = true;
    this.agregarActualizar = 'Agregar';
    this.resetProveedorData();
  }

  resetProveedorData(): void {
    this.datosProv = {
      id: '',
      RazonSocial: '',
      Rubro: '',
      Telefono: '',
      Email: '',
      SitioWeb: '',
      Imagen: '',
      Activo: true,
      Direccion: {
        Calle: '',
        Numero: '',
        CP: '',
        Localidad: '',
        Provincia: '',
        Pais: '',
      },
      DatosFiscales: {
        CUIT: '',
        CondicionIVA: '',
      },
      DatosContacto: {
        Nombre: '',
        Apellido: '',
        Telefono: '',
        Email: '',
        Rol: '',
      },
    };
  }

  buscarPais(pais: string): void {
    this.service.getStateData().subscribe((data: any) => {
      const idPais = this.paises.find((item) => item.name === pais)?.id;
      if (idPais != null) {
        this.provincias = data.states.filter(
          (item: any) => item.id_country === idPais
        );
      }
    });
  }

  agregarProveedor(form: NgForm): void {
    if (this.validarFormulario()) {
      this.service.uploadFakeData(this.datosProv).subscribe((data) => {
        console.log('Agregaste o actualizaste', data);
      });
      form.reset();
      this.router2.navigate(['/proveedores']);
    } else {
      this.openModal('No cumples con las condiciones');
    }
  }
  
  validarFormulario(): boolean {
    if (
      !this.validarStringAlfanumericoDe4Digitos(this.datosProv.id) ||
      !this.validarStringAlfanumericoEntre3y30Caracteres(this.datosProv.RazonSocial) ||
      this.datosProv.Rubro === 'Selecciona un rubro' ||
      !this.validarTelefono(this.datosProv.Telefono) ||
      !this.validarEmail(this.datosProv.Email) ||
      (this.datosProv.SitioWeb && !this.validarUrl(this.datosProv.SitioWeb)) ||
      (this.datosProv.Imagen && !this.validarUrl(this.datosProv.Imagen)) ||
      this.datosProv.Direccion.Pais === 'Selecciona Pais' ||
      this.datosProv.Direccion.Provincia === 'Selecciona Provincia' ||
      !this.validarStringAlfanumericoEntre3y30Caracteres(this.datosProv.Direccion.Localidad) ||
      !this.validarStringAlfanumericoEntre3y30Caracteres(this.datosProv.Direccion.Calle) ||
      parseInt(this.datosProv.Direccion.Numero) < 1 ||
      !this.validarCodigoPostal(this.datosProv.Direccion.CP) ||
      !this.validarCUIT(this.datosProv.DatosFiscales.CUIT) ||
      this.datosProv.DatosFiscales.CondicionIVA === 'Selecciona Condicion' ||
      !this.validarStringAlfanumericoEntre3y30Caracteres(this.datosProv.DatosContacto.Nombre) ||
      !this.validarStringAlfanumericoEntre3y30Caracteres(this.datosProv.DatosContacto.Apellido) ||
      !this.validarTelefono(this.datosProv.DatosContacto.Telefono) ||
      !this.validarEmail(this.datosProv.DatosContacto.Email) ||
      !this.validarStringAlfanumericoEntre3y30Caracteres(this.datosProv.DatosContacto.Rol)
    ) {
      return false;
    }

    return true;
  }
  validarStringAlfanumericoDe4Digitos(str: string): boolean {
    const regex = /^(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z]{4}$/;
    return regex.test(str);
  }
  validarStringAlfanumericoEntre3y30Caracteres(str: string): boolean {
    const regex = /^[0-9 A-Z a-z]{3,30}$/;
    return regex.test(str);
  }
  validarTelefono(telefono: string): boolean {
    const regex = /^\+\d{1,4}-\d{1,6}-\d{4,20}$/;
    return regex.test(telefono);
  }
  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  validarUrl(sitioWeb: string): boolean {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(sitioWeb);
  }
  validarCodigoPostal(codigoPostal: string): boolean {
    const regex = /^[0-9]{4,8}$/;
    return regex.test(codigoPostal);
  }
  validarCUIT(cuit: string): boolean {
    const regex = /^\d{2}-\d{8}-\d{1}$/;
    return regex.test(cuit);
  }

  codProvExists(): void {
    if (this.idProv === undefined) {
      this.existsCode = this.provs.some(
        (item: Proveedor) => item.id === this.datosProv.id
      );
    }
  }

  isCuitValidation(): void {
    if (this.idProv === undefined) {
      const fullCuit = this.datosProv.DatosFiscales.CUIT;
      if (fullCuit.length === 13 && fullCuit.includes('-')) {
        const arrCuit = fullCuit.split('-');
        if (arrCuit.length === 3) {
          const [firstPart, secondPart, thirdPart] = arrCuit;
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
            console.log('El CUIT no es válido. Al menos una parte no es un número válido.');
            this.isCuit = false;
          }
        } else {
          console.log('El CUIT no es válido. No hay tres partes después de dividir.');
          this.isCuit = false;
        }
      } else {
        console.log('El CUIT no es válido. Longitud incorrecta o falta guión.');
        this.isCuit = false;
      }
    }
  }

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

  openModal(aviso:string = "Informacion del formulario") {
    const mensajes: string [] = [];

    mensajes.push('Todos los campos son obligatorios.');
    mensajes.push('Completar todos los campos correctamente.');
    mensajes.push('Respeta los formatos ejemplificados.');
    mensajes.push('Evita dejar espacios en el comienzo, final o entre palabras.');
    mensajes.push('El código debe ser alfanumérico y contener exactamente 4 caracteres.');
    mensajes.push('Verifica que el teléfono siga el formato correcto, por ejemplo: +54-11-12345678.');
    mensajes.push('El correo electrónico debe tener el formato adecuado, por ejemplo: correo@example.com.');
    mensajes.push('La URL del sitio web y la Imagen debe comenzar con "https://" y seguir un formato válido.');
    mensajes.push('Asegúrate de seleccionar una opción válida en los campos desplegables.');
    
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.listado = mensajes
    modalRef.componentInstance.aviso = aviso;
  }
}
