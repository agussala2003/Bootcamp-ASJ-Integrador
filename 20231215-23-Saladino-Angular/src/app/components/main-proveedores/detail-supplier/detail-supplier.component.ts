import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../models/Supplier';
import { Contact } from '../../../models/Contact';
import { Country } from '../../../models/Country';
import { Province } from '../../../models/Province';
import { Location } from '../../../models/Location';
import { Address } from '../../../models/Address';
import { AddressService } from '../../../services/address.service';
import { ContactService } from '../../../services/contact.service';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-detail-supplier',
  templateUrl: './detail-supplier.component.html',
  styleUrls: ['./detail-supplier.component.css'], // Arreglado el nombre del atributo
})
export class DetailSupplierComponent implements OnInit {
  idSupplier: string = '';
  userState: any;

  industryViewModel: Industry = {
    id: '',
    industryName: '',
    active: true,
  };

  ivaConditionViewModel: IvaCondition = {
    id: '',
    taxCondition: '',
  };
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

  countryViewModel: Country = {
    id: '',
    countryName: '',
  };

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

  constructor(
    private supplierService: SupplierService,
    private addressService: AddressService,
    private contactService: ContactService,
    private alertService: AlertsService,
    private router: ActivatedRoute,
    private router2: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.idSupplier = data['idSupplier'];
      this.getSupplierById(this.idSupplier);
      this.getContactBySupplierId(this.idSupplier);
      this.getAddressBySupplierId(this.idSupplier);
    });
    this.userState = this.supplierService.getUserState();
  }

  getSupplierById(id: string): void {
    this.supplierService.getSupplierById(id).subscribe(
      (data: Supplier) => {
        this.supplierViewModel = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo obtener el proveedor');
      }
    );
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
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo obtener la direccion');
      }
    );
  }

  deleteSupplier(id: string): void {
    this.supplierService.deleteSupplier(id).subscribe(
      () => {
        console.log('You deleted a supplier');
        this.alertService.successNotification('Proveedor eliminado');
        this.router2.navigate(['/proveedores']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('No se pudo eliminar el proveedor');
      }
    );
  }

  undeleteSupplierById(id: string) {
    this.supplierService.patchSupplier(id).subscribe(
      (data: Supplier) => {
        console.log('You undeleted a supplier');
        console.log(data);
        this.alertService.successNotification('Proveedor recuperado');
        this.router2.navigate(['/proveedores']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'No se pudo recuperar el proveedor'
        );
      }
    );
  }
}
