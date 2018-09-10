import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor() {

  }

  toggleSideBar(){
    document.getElementById('sidebar').classList.toggle('active')
    console.log('hi')
  }

}
