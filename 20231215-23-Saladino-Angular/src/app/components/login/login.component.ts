import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private alertService: AlertsService
  ) {}

  users: User[] = [];

  userViewModel: User = {
    id: '',
    role: {
      id: '',
      roleName: '',
    },
    firstName: 'Prueba',
    lastName: 'Prueba',
    email: '',
    password: '',
    createdAt: '',
    updatedAt: '',
  };

  validateUser() {
    this.loginService.logUser(this.userViewModel).subscribe(
      (data) => {
        this.alertService.successNotification("Inicio de sesión exitoso");
        setTimeout(() => {
          window.location.href = '/inicio';
          this.userViewModel = data;
          this.loginService.validateLogin(data);
        }, 1000);
      },
      (error) => {
        console.log(error);
        this.alertService.errorNotification("Usuario o contraseña incorrectos");
      }
    );
  }
}
