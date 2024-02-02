import { Component, OnInit } from '@angular/core';
import { IndustryService } from '../../../services/industry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Industry } from '../../../models/Industry';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-form-industries',
  templateUrl: './form-industries.component.html',
  styleUrl: './form-industries.component.css',
})
export class FormIndustriesComponent implements OnInit {
  constructor(
    private industryService: IndustryService,
    private alertService: AlertsService,
    private router: Router,
    private router2: ActivatedRoute
  ) {}

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

  postIndustry(form: NgForm) {
    if (this.idIndustry === undefined) {
      this.createIndustry(this.industryViewModel);
    } else {
      this.putIndustry(this.industryViewModel);
    }
  }

  putIndustry(industry: Industry) {
    this.industryService.putIndustry(industry).subscribe(
      (data: Industry) => {
        console.log('You put');
        console.log(data);
        this.alertService.successNotification('Rubro actualizado');
        this.router.navigate(['/rubros']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al actualizar el rubro');
      }
    );
  }

  createIndustry(industry: Industry) {
    this.industryService.postIndustry(industry).subscribe(
      (data: Industry) => {
        console.log('You created');
        console.log(data);
        this.alertService.successNotification('Rubro creado');
        this.router.navigate(['/rubros']);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification('Error al crear el rubro');
      }
    );
  }
}