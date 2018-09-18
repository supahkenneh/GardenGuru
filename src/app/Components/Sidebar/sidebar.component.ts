import { Component, HostListener } from '@angular/core';
import { SessionService } from '../../Services/session.service';
import { AuthServiceReg} from '../../Services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  user: object;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (
      event.target !== document.getElementById('sidebar') &&
      event.target.id !== 'overlay' &&
      document.getElementById('sidebar').className === 'active'
    ) {
      document.getElementById('sidebar').classList.toggle('active');
    }
  }

  constructor(private session: SessionService, private auth: AuthServiceReg) {
    this.user = session.getSession();
  }

  isLoggedIn() {
    return this.session.isLoggedIn();
  }

  toggleSideBar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  logout() {
    return this.auth
      .logout()
      .then(() => {
        console.log('User successfully logged out');
      })
      .catch(err => {
        console.log(err.message);
      });
  }
}
