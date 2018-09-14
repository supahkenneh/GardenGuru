import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent {
  constructor() { }

  toggleSideBar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  // toggleSearchSideBar() { // to be used later
  //   document.getElementById('searchSidebar').classList.toggle('active');
  // }
}
