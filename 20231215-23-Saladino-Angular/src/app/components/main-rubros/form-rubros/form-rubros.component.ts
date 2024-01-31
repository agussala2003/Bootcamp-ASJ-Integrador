import { Component, OnInit } from '@angular/core';
import { RubrosService } from '../../../services/rubros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Industry } from '../../../models/Industry';

@Component({
  selector: 'app-form-rubros',
  templateUrl: './form-rubros.component.html',
  styleUrl: './form-rubros.component.css',
})
export class FormRubrosComponent implements OnInit {
  constructor(private industryService: RubrosService, private router: Router, private router2: ActivatedRoute) {}

  userState: any;
  industries: Industry[] = [];
  idIndustry: string = '';
  loaderFlag: boolean = false;

  industryViewModel: Industry = {
    id: '',
    industryName: '',
    active: true,
    createdAt: '',
    updatedAt: '',
  };

  ngOnInit(): void {
    this.router2.params.subscribe((params) => {
      this.idIndustry = params['idIndustry'];
      console.log(this.idIndustry);
      if (this.idIndustry != undefined) {
        this.getIndustryById(this.idIndustry);
      }
    });
    this.userState = this.industryService.getUserState();
  }

  getIndustryById(id: string) {
    this.industryService.getIndustryById(id).subscribe((data: Industry) => {
      console.log('You get Industry By id');
      console.log(data);
      this.industryViewModel = data;
    });
  }

  postIndustry(form: NgForm) {
    if (this.idIndustry === undefined) {
      this.createIndustry(this.industryViewModel);
    } else {
      this.putIndustry(this.industryViewModel);
    }
  }

  putIndustry(industry: Industry) {
    this.industryService.putIndustry(industry).subscribe((data: Industry) => {
      console.log('You put');
      console.log(data);
      this.router.navigate(['/rubros']);
    });
  }

  createIndustry(industry: Industry) {
    this.industryService.postIndustry(industry).subscribe((data: Industry) => {
      console.log('You created');
      console.log(data);
      this.router.navigate(['/rubros']);
    });
  }
}
