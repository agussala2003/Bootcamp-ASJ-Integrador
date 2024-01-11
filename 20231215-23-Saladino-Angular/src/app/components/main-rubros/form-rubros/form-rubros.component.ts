import { Component, OnInit } from '@angular/core';
import { RubrosService } from '../../../services/rubros.service';
import { Router } from '@angular/router';
import { Rubro } from '../../../models/Rubro';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-rubros',
  templateUrl: './form-rubros.component.html',
  styleUrl: './form-rubros.component.css'
})
export class FormRubrosComponent implements OnInit{
  constructor(public service: RubrosService,public router:Router){}
  userState:any
  rubrosFull: Rubro[] = [];
  rubros:Rubro = {
    id: '',
    rubro: ''
  };
  ngOnInit(): void {
    this.userState = this.service.getUserState();
    this.service.getFakeData().subscribe((data: Rubro[]) => {
      this.rubrosFull = data;
    });
  }
  // Agregamos rubro
  agregarRubro(form:NgForm) {
    const highestId = this.rubrosFull.reduce((maxId, item) => {
      const currentId = parseInt(item.id);
      return currentId > maxId ? currentId : maxId;
    }, 0);
    this.rubros.id = String(highestId + 1);
    this.service.uploadFakeData(this.rubros).subscribe(data => console.log(data));
    this.router.navigate(['/rubros']);
  }
}
