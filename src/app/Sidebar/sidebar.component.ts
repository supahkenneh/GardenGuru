import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  user:object;

  constructor(private session: SessionService, private auth: AuthService) {
    this.user = session.getSession();
  }

  isLoggedIn(){
    return this.session.isLoggedIn()
  }
  
  toggleSideBar() {
    document.getElementById('sidebar').classList.toggle('active')
  }


  logout() {
    return this.auth
      .logout()
      .then(() => {
        console.log('user logged out');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

}
