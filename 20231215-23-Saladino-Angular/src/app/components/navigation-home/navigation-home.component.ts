import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-home',
  templateUrl: './navigation-home.component.html',
  styleUrl: './navigation-home.component.css'
})
export class NavigationHomeComponent implements OnInit {
  valor:any = true;
  ngOnInit(): void {
    const location = (window.location.pathname === '/inicio')
    if (!location) {
      this.valor = JSON.parse(
        localStorage.getItem('inicio') || 'null'
      );
      this.valor !== null ? this.valor : null;
    }
  }
}
