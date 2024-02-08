import { Component } from '@angular/core';
import { User } from '../../models/User';
import { LoginService } from '../../services/login.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private loginService: LoginService, private alertService: AlertsService) { }

  userViewModel: User = {
    id: '',
    role: {
      id: '1',
      roleName: '',
    },
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    createdAt: '',
    updatedAt: '',
  };

  postUser() {
    this.loginService.createUser(this.userViewModel).subscribe(
      (data) => {
        this.alertService.successNotification("Creacion exitosa de usuario!");
        setTimeout(() => {
          window.location.href = '/login';
          this.userViewModel = data;
        }, 1000);
      },
      (error) => {
        console.log(error);
        if (error.error && error.error.firstName) {
          this.alertService.errorNotification(error.error.firstName);
        } else if(error.error && error.error.lastName) {
          this.alertService.errorNotification(error.error.lastName);
        } else if( error.error && error.error.email) {
          this.alertService.errorNotification(error.error.email);
        } else if(error.error && error.error.password) {
          this.alertService.errorNotification(error.error.password);
        } else {
          this.alertService.errorNotification(error.error);
        }
      }
    );
  }
}
