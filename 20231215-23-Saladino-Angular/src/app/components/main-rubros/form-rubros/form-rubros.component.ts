import { Component, OnInit } from '@angular/core';
import { RubrosService } from '../../../services/rubros.service';
import { Router } from '@angular/router';
import { Rubro } from '../../../models/Rubro';
import { NgForm } from '@angular/forms';
import { Industry } from '../../../models/Industry';

@Component({
  selector: 'app-form-rubros',
  templateUrl: './form-rubros.component.html',
  styleUrl: './form-rubros.component.css'
})
export class FormRubrosComponent implements OnInit{
  constructor(public industryService: RubrosService,public router:Router){}

  userState:any
  industries: Industry[] = [];

  industryViewModel: Industry = {
    id: '',
    industryName: '',
    createdAt: '',
    updatedAt: ''
  };

  ngOnInit(): void {
    this.userState = this.industryService.getUserState();
  }

  postIndustry(form:NgForm) {
    this.industryService.postIndustry(this.industryViewModel).subscribe((data: Industry) => {
      console.log("You Posted an Industry");
      console.log(data);
    })
    this.router.navigate(['/rubros']);
  }
}
