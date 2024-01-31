import { Component, OnInit } from '@angular/core';
import { RubrosService } from '../../../services/rubros.service';
import { Industry } from '../../../models/Industry';
import { SupplierService } from '../../../services/proveedores.service';
import { Supplier } from '../../../models/Supplier';

@Component({
  selector: 'app-tabla-rubros',
  templateUrl: './tabla-rubros.component.html',
  styleUrl: './tabla-rubros.component.css'
})
export class TablaRubrosComponent implements OnInit {
  constructor(private industryService: RubrosService,
    private supplierService: SupplierService
    ){}

  industries: Industry[] = [];
  suppliers: Supplier[] = [];
  loaderFlag = false;

  industryViewModel: Industry = {
    id: '',
    industryName: '',
    active: true,
    createdAt: '',
    updatedAt: ''
  };

  userState:any;

  ngOnInit(): void {
    this.userState = this.industryService.getUserState();
    this.refreshIndustries();
    this.getSuppliers();
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe((data: Supplier[]) => {
      console.log("You get all Suppliers");
      console.log(data);
      this.suppliers = data;
      this.loader();
    });
  }

  refreshIndustries() {
    this.industryService.getIndustries().subscribe((data: Industry[]) => {
      console.log("You get all Industries");
      console.log(data);
      this.industries = data.filter((item: Industry) => item.active === true);
    });
  }

  searchUsedIndustries(id: string) {
    let used = true;
    this.suppliers.forEach(supplier => {
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
  
  deleteIndustry(id:string) {
    this.industryService.deleteIndustry(id).subscribe((data: Industry) => {
      console.log("You Deleted");
      console.log(data);
      this.refreshIndustries();
      this.loader();
    })
  }
  
  getIndustryById(id: string) {
    this.industryService.getIndustryById(id).subscribe((data: Industry) => {
      console.log("You get Industry By id");
      console.log(data);
      this.industryViewModel = data;
    })
  }
}
