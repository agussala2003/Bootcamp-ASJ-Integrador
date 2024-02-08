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

  public logUser(user: User):Observable<User> {
    return this.http.post<User>(this.baseUrl + '/login', user);
  }

  public createUser(user: User):Observable<User> {
    return this.http.post<User>(this.baseUrl + '/create', user);
  }
  
  public validateLogin(user: User){
    const userModel = {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
    localStorage.setItem('inicio',JSON.stringify(true));
    localStorage.setItem('user',JSON.stringify(userModel));
  }

  public getUserState(): string | null {
    return JSON.parse(localStorage.getItem('inicio') || 'null');
  }
}
