import { Component} from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  constructor(public service: LoginService){}
  validarUsuario() {
    if(this.service.datosUser.username === this.service.lista[0].username && this.service.datosUser.password === this.service.lista[0].password) {
      this.service.validateLogin();
      alert('Iniciaste sesion correctamente');
      window.location.pathname = '/proveedores'
    } else{
      alert('Los datos no coinciden')
    }
  }
}
