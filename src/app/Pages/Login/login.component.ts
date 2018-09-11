import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormData: {
    username: string,
    password: string
  } = {
      username: '',
      password: ''
    };
  constructor(private auth: AuthService, private router: Router) { }

  login() {
    return this.auth
      .login(this.loginFormData)
      .then(() => {
        return this.router.navigate(['/garden']);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
}
