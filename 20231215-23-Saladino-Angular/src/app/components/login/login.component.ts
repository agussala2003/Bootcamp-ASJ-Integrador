import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(public service: LoginService){}
  
  users: User[] = [];

  userViewModel:User = {
    id: '',
    role: {
      id: '',
      roleName: ''
    },
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    createdAt: '',
    updatedAt: ''
  }
  
  ngOnInit(): void {
    this.updateUsers();
  }

  updateUsers() {
    this.service.getUsers().subscribe((data:User[]) => {
      console.log(data);
      this.users = data;
    })
  }

  validateUser() {
    const usuarioValido = this.users.find(user => user.email === this.userViewModel.email && user.password === this.userViewModel.password);
  
    if (usuarioValido) {
      this.service.validateLogin();
      alert('Iniciaste sesión correctamente');
      window.location.pathname = '/proveedores';
    } else {
      alert('Los datos no coinciden');
    }
  }
  
}
