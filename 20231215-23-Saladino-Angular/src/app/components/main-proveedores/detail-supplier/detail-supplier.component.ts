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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-supplier',
  templateUrl: './detail-supplier.component.html',
  styleUrls: ['./detail-supplier.component.css'], // Arreglado el nombre del atributo
})

export class DetailSupplierComponent implements OnInit {

  constructor(
    private supplierService: SupplierService,
    private addressService: AddressService,
    private contactService: ContactService,
    private alertService: AlertsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

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

  idSupplier: string = '';
  userState: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
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
    Swal.fire({
      title: `Estas seguro que quieres borrar el proveedor ${this.supplierViewModel.businessName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, borralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.deleteSupplier(id).subscribe(
          () => {
            console.log('You deleted a supplier');
            this.alertService.successNotification('Proveedor eliminado');
            this.router.navigate(['/proveedores']);
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('No se pudo eliminar el proveedor');
          }
        );
      }
    });
  }

  undeleteSupplierById(id: string) {
    Swal.fire({
      title: `Estas seguro que quieres reactivar el proveedor ${this.supplierViewModel.businessName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, activar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.patchSupplier(id).subscribe(
          (data: Supplier) => {
            console.log('You undeleted a supplier');
            console.log(data);
            this.alertService.successNotification('Proveedor recuperado');
            this.router.navigate(['/proveedores']);
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification(
              'No se pudo recuperar el proveedor'
            );
          }
        );
      }
    });
  }
}
