import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../../models/Supplier';
import { Contact } from '../../../models/Contact';
import { Address } from '../../../models/Address';
import { Location } from '../../../models/Location';
import { Province } from '../../../models/Province';
import { Country } from '../../../models/Country';
import { AddressService } from '../../../services/address.service';
import { ContactService } from '../../../services/contact.service';
import { Industry } from '../../../models/Industry';
import { IvaCondition } from '../../../models/IvaCondition';
import { SupplierService } from '../../../services/proveedores.service';

@Component({
  selector: 'app-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
  styleUrls: ['./tabla-proveedores.component.css'],
})
export class TablaProveedoresComponent implements OnInit {
  constructor(
    private supplierService: SupplierService,
    private addressService: AddressService,
    private contactService: ContactService
  ) {}

  suppliers: Supplier[] = [];
  addresses: Address[] = [];
  contacts: Contact[] = [];
  userState: any;
  supplierFilter: string = '';
  businessNameFilter: string = '0';
  prevPage: number = 0;
  nextPage: number = 5;
  isActiveItems: boolean = true;

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

  ngOnInit(): void {
    this.userState = this.supplierService.getUserState();
    this.refreshSuppliers();
    this.refreshContacts();
    this.refreshAddresses();
  }

  deleteSupplier(id: string) {
    this.supplierService.deleteSupplier(id).subscribe(() => {
      console.log('You deleted a Supplier');
      this.refreshSuppliers();
      this.refreshContacts();
      this.refreshAddresses();
    });
  }

  undeleteSupplierById(id:string) {
    this.supplierService.patchSupplier(id).subscribe((data:Supplier) => {
      console.log("You undeleted a supplier");
      console.log(data);
      this.isActiveItems = !this.isActiveItems;
      this.refreshSuppliers();
      this.refreshContacts();
      this.refreshAddresses();
    })
  }

  refreshSuppliers() {
    this.supplierService.getActiveSuppliers().subscribe((data: Supplier[]) => {
      console.log('You get active Suppliers');
      console.log(data);
      this.suppliers = data;
    });
  }
  refreshContacts() {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      console.log('You get contacts');
      console.log(data);
      this.contacts = data;
    });
  }
  refreshAddresses() {
    this.addressService.getAddresses().subscribe((data: Address[]) => {
      console.log('You get addresses');
      console.log(data);
      this.addresses = data;
    });
  }

  getContactBySupplierId(id: string): string {
    const contact = this.contacts.find((item: Contact) => item.supplier.id === id);
    if (contact !== undefined) {
      this.contactViewModel = contact;
      return `${this.contactViewModel.firstName} ${this.contactViewModel.lastName}`;
    }
    return 'No tiene contacto';
  }

  getDeletedSuppliers() {
    this.supplierService.getDeletedSuppliers().subscribe((data: Supplier[]) => {
      console.log('You get deleted Suppliers');
      console.log(data);
      this.suppliers = data;
    });
  }

  getSupplierById(id: string) {
    this.supplierService.getSupplierById(id).subscribe((data: Supplier) => {
      this.supplierViewModel = data;
    });
  }

  handleImageError(supplier: Supplier) {
    supplier.image = '../../../../assets/img/logoGenerico.png';
  }

  goPrevPage() {
    if (this.prevPage >= 5) {
      this.prevPage -= 5;
      this.nextPage -= 5;
    }
  }

  goNextPage() {
    this.prevPage += 5;
    this.nextPage += 5;
  }

  changeState() {
    this.isActiveItems = !this.isActiveItems;
    if (this.isActiveItems) {
      this.prevPage = 0;
      this.nextPage = 5;
      this.refreshSuppliers();
      this.refreshContacts();
      this.refreshAddresses();
    } else {
      this.getDeletedSuppliers();
      this.prevPage = 0;
      this.nextPage = 5;
    }
  }
}
