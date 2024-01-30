import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../../services/proveedores.service';
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

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'], // Arreglado el nombre del atributo
})
export class DetalleComponent implements OnInit {
  idSupplier: string = '';
  userState: any;

  industryViewModel: Industry = {
    id: '',
    industryName: '',
  }

  ivaConditionViewModel: IvaCondition = {
    id: '',
    taxCondition: '',
  }
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
    public supplierService: SupplierService,
    public addressService: AddressService,
    public contactService: ContactService,
    public router: ActivatedRoute,
    public router2: Router
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

  getSupplierById(id:string): void {
    this.supplierService.getSupplierById(id).subscribe(
      (data: Supplier) => (this.supplierViewModel = data)
    );
  }
  getContactBySupplierId(id:string) {
    this.contactService.getContactBySupplierId(id).subscribe((data: Contact[]) => {
      this.contactViewModel = data[0];
    })
  }
  getAddressBySupplierId(id:string) {
    this.addressService.getAddressBySupplierId(id).subscribe((data: Address[]) => {
      this.addressViewModel = data[0];
    })
  }

  deleteSupplier(id: string): void {
    this.supplierService.deleteSupplier(id).subscribe(
      () => {
        console.log('You deleted a supplier');
        this.router2.navigate(['/proveedores']);
      }
    );
  }
  undeleteSupplierById(id:string) {
    this.supplierService.patchSupplier(id).subscribe((data:Supplier) => {
      console.log("You undeleted a supplier");
      console.log(data);
      this.router2.navigate(['/proveedores']);
    })
  }
}
