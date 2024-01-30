import { Component, OnInit } from '@angular/core';
import { RubrosService } from '../../../services/rubros.service';
import { Industry } from '../../../models/Industry';

@Component({
  selector: 'app-tabla-rubros',
  templateUrl: './tabla-rubros.component.html',
  styleUrl: './tabla-rubros.component.css'
})
export class TablaRubrosComponent implements OnInit {
  constructor(public industryService: RubrosService){}

  industries: Industry[] = [];

  industryViewModel: Industry = {
    id: '',
    industryName: '',
    createdAt: '',
    updatedAt: ''
  };

  userState:any;

  ngOnInit(): void {
    this.userState = this.industryService.getUserState();
    this.refreshIndustries();
  }

  refreshIndustries() {
    this.industryService.getIndustries().subscribe((data: Industry[]) => {
      console.log("You get all Industries");
      console.log(data);
      this.industries = data;
    });
  }
  
  deleteIndustry(id:string) {
    this.industryService.deleteIndustry(id).subscribe((data: Industry) => {
      console.log("You Deleted");
      console.log(data);
      this.refreshIndustries();
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
