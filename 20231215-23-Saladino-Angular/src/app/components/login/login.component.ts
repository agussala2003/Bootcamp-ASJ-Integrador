import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private service: LoginService,
    private alertService: AlertsService
  ) {}

  users: User[] = [];

  userViewModel: User = {
    id: '',
    role: {
      id: '',
      roleName: '',
    },
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    createdAt: '',
    updatedAt: '',
  };

  ngOnInit(): void {
    this.updateUsers();
  }

  updateUsers() {
    this.service.getUsers().subscribe((data: User[]) => {
      console.log(data);
      this.users = data;
    }, (error) => {
      console.error(error);
      this.alertService.errorNotification('Error al cargar los usuarios');
    });
  }

  validateUser() {
    const usuarioValido = this.users.find(
      (user) =>
        user.email === this.userViewModel.email &&
        user.password === this.userViewModel.password
    );

    if (usuarioValido) {
      this.service.validateLogin();
      this.alertService.successNotification('Bienvenido');
      window.location.pathname = '/inicio';
    } else {
      this.alertService.errorNotification('Usuario o contraseña incorrectos');
    }
  }
}
