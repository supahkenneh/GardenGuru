import { Component, HostListener } from '@angular/core';
import { SessionService } from '../../Services/session.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls:['./search.component.scss']
})

export class SearchComponent {
  user: object;
  category: any;

  categories: string[] = ['Marketplace', 'Stand', 'Garden'];

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (
      event.target !== document.getElementById('search-sidebar') &&
      event.target.id !== 'search' &&
      document.getElementById('search-sidebar').className === 'active'
    ) {
      document.getElementById('search-sidebar').classList.toggle('active');
    }
  }

  constructor(private session: SessionService, private auth: AuthService) {
    this.user = session.getSession();
  }

  isLoggedIn() {
    return this.session.isLoggedIn();
  }

  toggleSearchSideBar() {
    document.getElementById('search-sidebar').classList.toggle('active');
  }

  // Search methods goes below here
}