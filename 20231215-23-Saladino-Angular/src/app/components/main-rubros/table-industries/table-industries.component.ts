import { Component, OnInit } from '@angular/core';
import { IndustryService } from '../../../services/industry.service';
import { Industry } from '../../../models/Industry';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../models/Supplier';
import { AlertsService } from '../../../services/alerts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-industries',
  templateUrl: './table-industries.component.html',
  styleUrl: './table-industries.component.css',
})
export class TableIndustriesComponent implements OnInit {

  constructor(
    private industryService: IndustryService,
    private supplierService: SupplierService,
    private alertService: AlertsService,
    private modalService: NgbModal
  ) {}

  industryViewModel: Industry = {
    id: '',
    industryName: '',
    active: true,
    createdAt: '',
    updatedAt: '',
  }; 
  
  industries: Industry[] = [];
  suppliers: Supplier[] = [];
  loaderFlag = false;
  isEditedIndustry: boolean = false;
  isActiveItems = true;
  userState: any;
  deletedLength = 0;

  ngOnInit(): void {
    this.userState = this.industryService.getUserState();
    this.getActiveIndustries();
    this.getSuppliers();
    this.getDeletedLength();
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

  getActiveIndustries() {
    this.isActiveItems = true;
    this.industryService.getActiveIndustries().subscribe(
      (data: Industry[]) => {
        console.log('You get active Industries');
        console.log(data);
        this.industries = data;
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los rubros');
      }
    );
  }

  getDeletedIndustries() {
    this.industryService.getDeletedIndustries().subscribe(
      (data: Industry[]) => {
        console.log('You get deleted Industries');
        console.log(data);
        this.industries = data;
        this.loader();
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al obtener los rubros');
      }
    );
  }

  getDeletedLength() {
    this.industryService.getDeletedIndustries().subscribe(
      (data: Industry[]) => {
        console.log('You get deleted Industries');
        console.log(data);
        this.deletedLength = data.length;
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

  putIndustry(industry: Industry) {
    Swal.fire({
      title: `Estas seguro que quieres actualizar el rubro ${industry.industryName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, actualizala!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.industryService.putIndustry(industry).subscribe(
          (data: Industry) => {
            console.log('You put');
            console.log(data);
            this.alertService.successNotification('Rubro actualizado');
            this.getActiveIndustries();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al actualizar el rubro, puede que ya exista o no hayas realizado cambios');
          }
        );
      }
    });
  }

  createIndustry(industry: Industry) {
    Swal.fire({
      title: `Estas seguro que quieres crear el rubro ${industry.industryName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, crealo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.industryService.postIndustry(industry).subscribe(
          (data: Industry) => {
            console.log('You created');
            console.log(data);
            this.alertService.successNotification('Rubro creado');
            this.getActiveIndustries();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al crear el rubro, puede que ya exista o no hayas realizado');
          }
        );
      }
    });
  }

  deleteIndustry(id: string, industryName: string) {
    Swal.fire({
      title: `Estas seguro que quieres borrar el rubro ${industryName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, borralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.industryService.deleteIndustry(id).subscribe(
          (data: Industry) => {
            console.log('You Deleted');
            console.log(data);
            this.getActiveIndustries();
            this.alertService.successNotification('Rubro eliminado');
            this.loader();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al eliminar el rubro');
          }
        );
      }
    });
  }

  undeleteIndustry(id: string, industryName: string) {
    Swal.fire({
      title: `Estas seguro que quieres reactivar el rubro ${industryName}?`,
      text: "Una vez aceptado no podras deshacer esta accion!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, activalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.industryService.undeleteIndustry(id).subscribe(
          (data: Industry) => {
            console.log('You Undeleted');
            console.log(data);
            this.getActiveIndustries();
            this.alertService.successNotification('Rubro restaurado');
            this.loader();
          },
          (error) => {
            console.log(error);
            this.alertService.errorNotification('Error al restaurar el rubro');
          }
        );
      }
    });
  }
  
  openModal(content: any, id?: string) {
    if(id) {
      this.isEditedIndustry = true;
      this.getIndustryById(id);
    } else {
      this.isEditedIndustry = false;
      this.cleanIndustryViewModel();
    }
    this.modalService.open(content, { centered: true });
  }

  closeModal() {
    if (this.isEditedIndustry) {
      this.isEditedIndustry = false;
      this.putIndustry(this.industryViewModel);
      this.cleanIndustryViewModel();
      this.modalService.dismissAll();
    } else {
      this.createIndustry(this.industryViewModel);
      this.cleanIndustryViewModel();
      this.modalService.dismissAll();
    }
  }

  changeState() {
    this.isActiveItems = !this.isActiveItems;
    if (this.isActiveItems) {
      this.getActiveIndustries();
    } else {
      this.getDeletedIndustries();
    }
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

  cleanIndustryViewModel() {
    this.industryViewModel = {
      id: '',
      industryName: '',
      active: true,
      createdAt: '',
      updatedAt: '',
    };
  }
}
