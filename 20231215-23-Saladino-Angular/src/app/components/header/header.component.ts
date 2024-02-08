import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    constructor(private loginService: LoginService) { }

    userState: string | null = this.loginService.getUserState();
    user:User = this.getUser();
  
    ngOnInit(): void {
        this.userState = this.loginService.getUserState();
        this.user = this.getUser();
        console.log(this.userState);
        console.log(this.user);
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    logout() {
        localStorage.removeItem('inicio');
        localStorage.removeItem('user');
        this.userState = null;
        window.location.href = '/inicio';
    }
}
