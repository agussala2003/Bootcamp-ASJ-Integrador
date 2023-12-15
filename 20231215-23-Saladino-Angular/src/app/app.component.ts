import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '20231215-23-Saladino-Angular';
  sidebarFlag: boolean = true;
  sidebarBurguer(){
    this.sidebarFlag = !this.sidebarFlag
  }
}
