import { Component, OnInit } from '@angular/core';
import { RubrosService } from '../../../services/rubros.service';
import { Industry } from '../../../models/Industry';
import { SupplierService } from '../../../services/proveedores.service';
import { Supplier } from '../../../models/Supplier';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-tabla-rubros',
  templateUrl: './tabla-rubros.component.html',
  styleUrl: './tabla-rubros.component.css',
})
export class TablaRubrosComponent implements OnInit {
  constructor(
    private industryService: RubrosService,
    private supplierService: SupplierService,
    private alertService: AlertsService
  ) {}

  industries: Industry[] = [];
  suppliers: Supplier[] = [];
  loaderFlag = false;

  industryViewModel: Industry = {
    id: '',
    industryName: '',
    active: true,
    createdAt: '',
    updatedAt: '',
  };

  userState: any;

  ngOnInit(): void {
    this.userState = this.industryService.getUserState();
    this.refreshIndustries();
    this.getSuppliers();
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      (data: Supplier[]) => {
        console.log('You get all Suppliers');
        console.log(data);
        this.suppliers = data;
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los proveedores');
      }
    );
  }

  refreshIndustries() {
    this.industryService.getIndustries().subscribe(
      (data: Industry[]) => {
        console.log('You get all Industries');
        console.log(data);
        this.industries = data.filter((item: Industry) => item.active === true);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los rubros');
      }
    );
  }

  getIndustryById(id: string) {
    this.industryService.getIndustryById(id).subscribe(
      (data: Industry) => {
        console.log('You get Industry By id');
        console.log(data);
        this.industryViewModel = data;
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener el rubro');
      }
    );
  }

  deleteIndustry(id: string) {
    this.industryService.deleteIndustry(id).subscribe(
      (data: Industry) => {
        console.log('You Deleted');
        console.log(data);
        this.refreshIndustries();
        this.alertService.successNotification('Rubro eliminado');
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al eliminar el rubro');
      }
    );
  }

  searchUsedIndustries(id: string) {
    let used = true;
    this.suppliers.forEach((supplier) => {
      if (supplier.industry.id === id) {
        used = false;
      }
    });
    return used;
  }

  loader() {
    this.loaderFlag = true;
    setTimeout(() => {
      this.loaderFlag = false;
    }, 1000);
  }
}
