import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IndustryService } from '../../../services/industry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { Industry } from '../../../models/Industry';
import { Country } from '../../../models/Country';
import { Supplier } from '../../../models/Supplier';
import { Contact } from '../../../models/Contact';
import { Province } from '../../../models/Province';
import { Location } from '../../../models/Location';
import { Address } from '../../../models/Address';
import { IvaCondition } from '../../../models/IvaCondition';
import { ContactService } from '../../../services/contact.service';
import { AddressService } from '../../../services/address.service';
import { CountryService } from '../../../services/country.service';
import { ProvinceService } from '../../../services/province.service';
import { IvaConditionService } from '../../../services/iva-condition.service';
import { LocationService } from '../../../services/location.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-form-supplier',
  templateUrl: './form-supplier.component.html',
  styleUrls: ['./form-supplier.component.css'],
})

export class FormSupplierComponent implements OnInit {

  constructor(
    private supplierService: SupplierService,
    private industryService: IndustryService,
    private contactService: ContactService,
    private addressService: AddressService,
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private ivaConditionService: IvaConditionService,
    private locationService: LocationService,
    private alertService: AlertsService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  industryViewModel: Industry = { id: '', industryName: '', active: true };

  ivaConditionViewModel: IvaCondition = { id: '', taxCondition: '' };

  supplierViewModel: Supplier = {
    id: '',
    supplierCode: '',
    businessName: '',
    active: true,
    cuit: '',
    email: '',
    image: '',
    phoneNumber: '',
    website: '',
    industry: this.industryViewModel,
    ivaCondition: this.ivaConditionViewModel,
    createdAt: '',
    updatedAt: '',
  };

  contactViewModel: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    supplier: this.supplierViewModel,
    createdAt: '',
    updatedAt: '',
  };

  countryViewModel: Country = { id: '', countryName: '' };

  provinceViewModel: Province = {
    id: '',
    country: this.countryViewModel,
    provinceName: '',
  };

  locationViewModel: Location = {
    id: '',
    locationName: '',
    province: this.provinceViewModel,
  };

  addressViewModel: Address = {
    id: '',
    postalCode: '',
    streetName: '',
    streetNumber: 0,
    supplier: this.supplierViewModel,
    location: this.locationViewModel,
    createdAt: '',
    updatedAt: '',
  };

  idSupplier: string = '';
  countries: Country[] = [];
  provinces: Province[] = [];
  userState: any;
  flagCode: boolean = true;
  existsCode: boolean = false;
  isCuit: boolean = true;
  industries: Industry[] = [];
  suppliers: Supplier[] = [];
  ivaConditions: IvaCondition[] = [];
  loaderFlag: boolean = false;
  initSupplierCode: string = '';
  industryFlag: boolean = false;
  newIndustry: string = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.idSupplier = data['idSupplier'];
      if (this.idSupplier !== undefined) {
        this.getSupplierById(this.idSupplier);
        this.getContactBySupplierId(this.idSupplier);
        this.getAddressBySupplierId(this.idSupplier);
      } else {
        this.setupNewSupplier();
        this.openModal('Informacion del formulario');
      }
    });

    this.userState = this.supplierService.getUserState();

    this.getCountries();
    this.getProvinces();
    this.getIndustries();
    this.getSuppliers();
    this.getIvaConditions();
  }

  setupNewSupplier(): void {
    this.flagCode = true;
    this.resetSupplierData();
  }

  getProvinces() {
    this.provinceService.getProvinces().subscribe(
      (data: Province[]) => {
        this.provinces = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener las provincias');
      }
    );
  }

  getIndustries() {
    this.industryService.getIndustries().subscribe(
      (data: Industry[]) => {
        this.industries = data.filter((item: Industry) => item.active === true);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los rubros');
      }
    );
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      (data: Country[]) => {
        this.countries = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los paises');
      }
    );
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      (data: Supplier[]) => {
        this.suppliers = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los proveedores');
      }
    );
  }

  getIvaConditions() {
    this.ivaConditionService.getIvaConditions().subscribe(
      (data: IvaCondition[]) => {
        this.ivaConditions = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Error al obtener las condiciones de IVA'
        );
      }
    );
  }

  getSupplierById(id: string): void {
    this.supplierService.getSupplierById(id).subscribe(
      (data: Supplier) => {
        this.supplierViewModel = data;
        this.initSupplierCode = this.supplierViewModel.supplierCode;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo obtener el proveedor');
      }
    );
    this.flagCode = false;
  }

  getContactBySupplierId(id: string) {
    this.contactService.getContactBySupplierId(id).subscribe(
      (data: Contact[]) => {
        this.contactViewModel = data[0];
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo obtener el contacto');
      }
    );
  }

  getAddressBySupplierId(id: string) {
    this.addressService.getAddressBySupplierId(id).subscribe(
      (data: Address[]) => {
        this.addressViewModel = data[0];
        this.filterProvince(this.addressViewModel.location.province.country.id);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo obtener la direccion');
      }
    );
  }

  onCountryChange(): void {
    const selectedCountryId =
      this.addressViewModel.location.province.country.id;
    if (selectedCountryId) {
      this.filterProvince(selectedCountryId);
    }
  }

  filterProvince(id: string): void {
    this.provinceService.getProvincesByCountryId(id).subscribe(
      (data: Province[]) => {
        this.provinces = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener las provincias');
      }
    );
  }

  postIndustry() {
    this.industryViewModel.industryName = this.newIndustry;
    this.industryService.postIndustry(this.industryViewModel).subscribe(
      (data: Industry) => {
        console.log('You posted an industry');
        console.log(data);
        this.alertService.successNotification('Rubro creado');
        this.industryViewModel = data;
        this.supplierViewModel.industry.id = this.industryViewModel.id;
        this.newIndustry = '';
        this.industryFlag = false;
        this.getIndustries();
  }, (error) => {
    console.log(error);
    this.alertService.errorNotification('No se pudo crear el rubro');
  }
  );
  }

  submitSupplier(form: NgForm): void {
    if (this.initSupplierCode !== this.supplierViewModel.supplierCode) {
      this.supplierCodeExists();
    }
    if (this.validateForm()) {
      if (this.idSupplier !== undefined) {
        this.putSupplier(this.idSupplier, this.supplierViewModel);
      } else {
        this.postSupplier(this.supplierViewModel);
      }
    } else {
      this.openModal('No cumples con las condiciones');
    }
  }

  postSupplier(supplier: Supplier) {
    this.supplierService.postSupplier(supplier).subscribe(
      (data: Supplier) => {
        console.log('You posted a supplier');
        console.log(data);
        this.supplierViewModel = data;
        this.postContact(this.contactViewModel);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo crear el proveedor');
      }
    );
  }

  postContact(contact: Contact) {
    contact.supplier.id = this.supplierViewModel.id;
    this.contactService.createContact(contact).subscribe(
      (data: Contact) => {
        console.log('You posted a contact');
        console.log(data);
        this.contactViewModel = data;
        this.postLocation(this.addressViewModel.location);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo crear el contacto');
      }
    );
  }

  postLocation(location: Location) {
    this.locationService.createLocation(location).subscribe(
      (data: Location) => {
        console.log('You posted a location');
        console.log(data);
        this.locationViewModel = data;
        this.postAddress(this.addressViewModel);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo crear la ubicacion');
      }
    );
  }

  postAddress(address: Address) {
    address.location.id = this.locationViewModel.id;
    this.addressService.postAddress(address).subscribe(
      (data: Address) => {
        console.log('You posted a location');
        console.log(data);
        this.addressViewModel = data;
        this.resetSupplierData();
        this.alertService.successNotification('Proveedor creado');
        this.router.navigate(['/proveedores']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo crear la direccion');
      }
    );
  }

  putSupplier(id: string, supplier: Supplier) {
    this.supplierService.putSupplier(id, supplier).subscribe(
      (data: Supplier) => {
        console.log('You updated a supplier');
        console.log(data);
        this.supplierViewModel = data;
        this.putContact(this.contactViewModel);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'No se pudo actualizar el proveedor'
        );
      }
    );
  }

  putContact(contact: Contact) {
    contact.supplier.id = this.supplierViewModel.id;
    this.contactService.updateContact(contact.id, contact).subscribe(
      (data: Contact) => {
        console.log('You updated a contact');
        console.log(data);
        this.contactViewModel = data;
        this.putLocation(this.addressViewModel.location);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'No se pudo actualizar el contacto'
        );
      }
    );
  }

  putLocation(location: Location) {
    this.locationService
      .updateLocation(this.addressViewModel.id, location)
      .subscribe(
        (data: Location) => {
          console.log('You updated a location:');
          console.log(data);
          this.locationViewModel = data;
          this.putAddress(this.addressViewModel);
        },
        (error) => {
          console.log(error);
          this.alertService.errorNotification(
            'No se pudo actualizar la ubicacion'
          );
        }
      );
  }

  putAddress(address: Address) {
    address.location.id = this.locationViewModel.id;
    this.addressService.putAddress(address.id, address).subscribe(
      (data: Address) => {
        console.log('You updated an address');
        console.log(data);
        this.addressViewModel = data;
        this.resetSupplierData();
        this.alertService.successNotification('Proveedor actualizado');
        this.router.navigate(['/proveedores']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'No se pudo actualizar la direccion'
        );
      }
    );
  }

  validateForm(): boolean {
    if (
      !this.validateSupplierCode(
        this.supplierViewModel.supplierCode
      ) ||
      !this.validateRegularString(
        this.supplierViewModel.businessName
      ) ||
      this.supplierViewModel.industry.id === 'Selecciona un rubro' ||
      !this.validatePhoneNumber(this.supplierViewModel.phoneNumber) ||
      !this.validateEmail(this.supplierViewModel.email) ||
      (this.supplierViewModel.website &&
        !this.validateUrl(this.supplierViewModel.website)) ||
      (this.supplierViewModel.image &&
        !this.validateUrl(this.supplierViewModel.image)) ||
      this.addressViewModel.location.province.country.id ===
        'Selecciona Pais' ||
      this.addressViewModel.location.province.id === 'Selecciona Provincia' ||
      !this.validateRegularString(
        this.addressViewModel.location.locationName
      ) ||
      !this.validateRegularString(
        this.addressViewModel.streetName
      ) ||
      this.addressViewModel.streetNumber < 1 ||
      !this.validatePostalCode(this.addressViewModel.postalCode) ||
      !this.validateCuit(this.supplierViewModel.cuit) ||
      this.supplierViewModel.ivaCondition.id === 'Selecciona Condicion' ||
      !this.validateRegularString(
        this.contactViewModel.firstName
      ) ||
      !this.validateRegularString(
        this.contactViewModel.lastName
      ) ||
      !this.validatePhoneNumber(this.contactViewModel.phoneNumber) ||
      !this.validateEmail(this.contactViewModel.email) ||
      !this.validateRegularString(
        this.contactViewModel.role
      ) ||
      this.existsCode
    ) {
      return false;
    }
    return true;
  }

  validateSupplierCode(str: string): boolean {
    const regex = /^(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z]{4,8}$/;
    return regex.test(str);
  }

  validateRegularString(str: string): boolean {
    const regex = /^[0-9 A-Z a-z]{3,50}$/;
    return regex.test(str);
  }

  validatePhoneNumber(telefono: string): boolean {
    const regex = /^\+\d{1,4}-\d{1,6}-\d{4,20}$/;
    return regex.test(telefono);
  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validateUrl(sitioWeb: string): boolean {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(sitioWeb);
  }

  validatePostalCode(codigoPostal: string): boolean {
    const regex = /^[0-9]{4,8}$/;
    return regex.test(codigoPostal);
  }

  validateCuit(cuit: string): boolean {
    const regex = /^\d{2}-\d{8}-\d{1}$/;
    return regex.test(cuit);
  }

  supplierCodeExists(): void {
    if (this.initSupplierCode !== this.supplierViewModel.supplierCode) {
      this.existsCode = this.suppliers.some(
        (item: Supplier) =>
          item.supplierCode === this.supplierViewModel.supplierCode
      );
    }
  }

  isCuitValidation(): void {
    if (this.idSupplier === undefined) {
      const fullCuit = this.supplierViewModel.cuit;
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

  openModal(aviso: string = 'Informacion del formulario') {
    const mensajes: string[] = [];

    mensajes.push('Todos los campos son obligatorios.');
    mensajes.push('Completar todos los campos correctamente.');
    mensajes.push('Respeta los formatos ejemplificados.');
    mensajes.push(
      'Evita dejar espacios en el comienzo, final o entre palabras.'
    );
    mensajes.push(
      'El código debe ser alfanumérico y contener entre 4 y 8 caracteres.'
    );
    mensajes.push(
      'Verifica que el teléfono siga el formato correcto, por ejemplo: +54-11-12345678.'
    );
    mensajes.push(
      'El correo electrónico debe tener el formato adecuado, por ejemplo: correo@example.com.'
    );
    mensajes.push(
      'La URL del sitio web y la Imagen debe comenzar con "https://" y seguir un formato válido.'
    );
    mensajes.push(
      'Asegúrate de seleccionar una opción válida en los campos desplegables.'
    );

    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.listado = mensajes;
    modalRef.componentInstance.aviso = aviso;
  }

  resetSupplierData(): void {
    this.supplierViewModel = {
      id: '',
      supplierCode: '',
      businessName: '',
      active: true,
      cuit: '',
      email: '',
      image: '',
      phoneNumber: '',
      website: '',
      industry: {
        id: '',
        industryName: '',
        active: true,
      },
      ivaCondition: {
        id: '',
        taxCondition: '',
      },
      createdAt: '',
      updatedAt: '',
    };

    this.contactViewModel = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
      supplier: this.supplierViewModel,
      createdAt: '',
      updatedAt: '',
    };

    this.countryViewModel = {
      id: '',
      countryName: '',
    };

    this.provinceViewModel = {
      id: '',
      country: this.countryViewModel,
      provinceName: '',
    };

    this.locationViewModel = {
      id: '',
      locationName: '',
      province: this.provinceViewModel,
    };

    this.addressViewModel = {
      id: '',
      postalCode: '',
      streetName: '',
      streetNumber: 0,
      supplier: this.supplierViewModel,
      location: this.locationViewModel,
      createdAt: '',
      updatedAt: '',
    };
  }
}
