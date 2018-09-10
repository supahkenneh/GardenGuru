import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private auth: AuthService) {}

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
