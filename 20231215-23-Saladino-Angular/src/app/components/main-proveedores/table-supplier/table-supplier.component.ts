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
import { SupplierService } from '../../../services/supplier.service';
import { AlertsService } from '../../../services/alerts.service';
import { SearchPipe } from '../../../pipes/search.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-supplier',
  templateUrl: './table-supplier.component.html',
  styleUrls: ['./table-supplier.component.css'],
})
export class TableSupplierComponent implements OnInit {
  constructor(
    private supplierService: SupplierService,
    private addressService: AddressService,
    private contactService: ContactService,
    private alertService: AlertsService
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

  suppliers: Supplier[] = [];
  addresses: Address[] = [];
  contacts: Contact[] = [];
  initActiveSuppliers: Supplier[] = [];
  initDeletedSuppliers: Supplier[] = [];
  userState: any;
  supplierFilter: string = '';
  businessNameFilter: string = '0';
  prevPage: number = 0;
  nextPage: number = 5;
  isActiveItems: boolean = true;
  loaderFlag: boolean = false;
  deletedLength: number = 0;
  supplierLength: number = 0;


  ngOnInit(): void {
    this.userState = this.supplierService.getUserState();
    this.getActiveSuppliers();
    this.getContacts();
    this.getAddresses();
    this.getDeletedLenght();
  }

  getActiveSuppliers() {
    this.supplierService.getActiveSuppliers().subscribe(
      (data: Supplier[]) => {
        console.log('You get active Suppliers');
        console.log(data);
        this.suppliers = data;
        this.isActiveItems = true;
        this.supplierLength = data.length;
        this.initActiveSuppliers = data;
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Parece que ocurrio un error, intente nuevamente'
        );
      }
    );
  }

  getContacts() {
    this.contactService.getContacts().subscribe(
      (data: Contact[]) => {
        console.log('You get contacts');
        console.log(data);
        this.contacts = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Parece que ocurrio un error, intente nuevamente'
        );
      }
    );
  }

  getAddresses() {
    this.addressService.getAddresses().subscribe(
      (data: Address[]) => {
        console.log('You get addresses');
        console.log(data);
        this.businessNameFilter = '0';
        this.addresses = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Parece que ocurrio un error, intente nuevamente'
        );
      }
    );
  }

  getDeletedLenght() {
    this.supplierService.getDeletedSuppliers().subscribe(
      (data: Supplier[]) => {
        this.deletedLength = data.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getContactBySupplierId(id: string): string {
    const contact = this.contacts.find(
      (item: Contact) => item.supplier.id === id
    );
    if (contact !== undefined) {
      this.contactViewModel = contact;
      return `${this.contactViewModel.firstName} ${this.contactViewModel.lastName}`;
    }
    return 'No tiene contacto';
  }

  getAddressBySupplierId(id: string): string {
    const address = this.addresses.find(
      (item: Address) => item.supplier.id === id
    );
    if (address !== undefined) {
      this.addressViewModel = address;
      return `${this.addressViewModel.location.province.country.countryName} - ${this.addressViewModel.location.province.provinceName}`;
    }
    return 'No tiene dirección';
  }

  getDeletedSuppliers() {
    this.supplierService.getDeletedSuppliers().subscribe(
      (data: Supplier[]) => {
        console.log('You get deleted Suppliers');
        console.log(data);
        this.suppliers = data;
        this.businessNameFilter = '0';
        this.supplierLength = data.length;
        this.initDeletedSuppliers = data;
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Parece que ocurrio un error, intente nuevamente'
        );
      }
    );
  }

  getSuppliersByBusinessNameAsc() {
    this.supplierService.getSuppliersByBusinessNameAsc().subscribe(
      (data: Supplier[]) => {
        console.log('You get Suppliers by business name asc');
        console.log(data);
        this.suppliers = data.filter(
          (item: Supplier) => item.active === this.isActiveItems
        );
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Parece que ocurrio un error, intente nuevamente'
        );
      }
    );
  }

  getSuppliersByBusinessNameDesc() {
    this.supplierService.getSuppliersByBusinessNameDesc().subscribe(
      (data: Supplier[]) => {
        console.log('You get Suppliers by business name desc');
        console.log(data);
        this.suppliers = data.filter(
          (item: Supplier) => item.active === this.isActiveItems
        );
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification(
          'Parece que ocurrio un error, intente nuevamente'
        );
      }
    );
  }

  deleteSupplier(id: string, supplierName: string) {
    Swal.fire({
      title: `Estas seguro que quieres borrar el proveedor ${supplierName}?`,
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
            console.log('You deleted a Supplier');
            this.getActiveSuppliers();
            this.getContacts();
            this.getAddresses();
            this.getDeletedLenght();
            this.businessNameFilter = '0';
            this.alertService.successNotification(`Proveedor dado de baja`);
            this.loader();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification(
              'Parece que ocurrio un error, intente nuevamente'
            );
          }
        );
      }
    });
  }

  undeleteSupplierById(id: string, supplierName: string) {
    Swal.fire({
      title: `Estas seguro que quieres reactivar el proveedor ${supplierName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, activalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.patchSupplier(id).subscribe(
          (data: Supplier) => {
            console.log('You undeleted a supplier');
            console.log(data);
            this.isActiveItems = !this.isActiveItems;
            this.getActiveSuppliers();
            this.getContacts();
            this.getAddresses();
            this.getDeletedLenght();
            this.businessNameFilter = '0';
            this.alertService.successNotification(`Proveedor fue dado de alta`);
            this.loader();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification(
              'Parece que ocurrio un error, intente nuevamente'
            );
          }
        );
      }
    });
  }

  onBusinessNameFilterChange(number: number) {
    if (this.businessNameFilter === '0') {
      this.getSuppliersByBusinessNameAsc();
      this.businessNameFilter = '1';
      this.supplierFilter = '';
      this.resetPages();
    } else if (this.businessNameFilter === '1') {
      this.getSuppliersByBusinessNameDesc();
      this.businessNameFilter = '2';
      this.supplierFilter = '';
      this.resetPages();
    } else if (this.businessNameFilter === '2') {
      if(this.isActiveItems)
        this.getActiveSuppliers();
      else
        this.getDeletedSuppliers();
      this.businessNameFilter = '0';
      this.supplierFilter = '';
      this.resetPages();
    }
  }

  loader() {
    this.loaderFlag = true;
    setTimeout(() => {
      this.loaderFlag = false;
    }, 1000);
  }

  resetPages() {
    this.prevPage = 0;
    this.nextPage = 5;
  }

  onFilterChange() {
    this.resetPages();
    if(this.supplierFilter === '' ){
      if(this.isActiveItems)
        this.getActiveSuppliers()
      else
        this.getDeletedSuppliers()
    } else {
      if(this.isActiveItems) {
        this.businessNameFilter = '0';
        const filterActive = new SearchPipe().transform(this.initActiveSuppliers, this.supplierFilter);
        this.suppliers = filterActive.filteredData;
        this.supplierLength = filterActive.filteredDataLength;
      } else {
        this.businessNameFilter = '0';
        const filterDeleted = new SearchPipe().transform(this.initDeletedSuppliers, this.supplierFilter);
        this.suppliers = filterDeleted.filteredData;
        this.supplierLength = filterDeleted.filteredDataLength;
      }
    }
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
      this.resetPages();
      this.businessNameFilter = '0';
      this.supplierFilter = '';
      this.getActiveSuppliers();
      this.getContacts();
      this.getAddresses();
    } else {
      this.businessNameFilter = '0';
      this.supplierFilter = '';
      this.getDeletedSuppliers();
      this.resetPages();
    }
  }
}
