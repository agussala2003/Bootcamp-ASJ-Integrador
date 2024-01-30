import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  private readonly baseUrl = 'http://localhost:8080/users';

  public getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  public validateLogin(){
    localStorage.setItem('inicio',JSON.stringify(true));
  }
}
