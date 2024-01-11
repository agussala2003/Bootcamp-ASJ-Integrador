import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  adminFlag:boolean = false;
  userFlag:boolean = false;
  extrasFlag:boolean = false;
  isPath(arg0: string) {
    return window.location.pathname == arg0;
  }
}
