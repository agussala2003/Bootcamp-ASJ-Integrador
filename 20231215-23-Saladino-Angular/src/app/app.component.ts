import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = '20231215-23-Saladino-Angular';
  sidebarFlag: boolean = true;

  ngOnInit(): void {
    window.innerWidth > 767 ? this.sidebarFlag = false : '';  
  }

  sidebarBurguer(){
    this.sidebarFlag = !this.sidebarFlag
  }
}
