import { Injectable } from '@angular/core';
import { usuarios } from '../../data/usuarios';
import { User } from '../models/User';
const data:User[] = usuarios;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }
  lista: User[] = data;
  datosUser:User = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false,
    isClient: false,
    isNormalUser: false,
  }
  public validateLogin(){
    localStorage.setItem('inicio',JSON.stringify(true));
  }
}
