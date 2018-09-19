import { Component, OnInit } from '@angular/core';
import { AuthServiceReg } from '../../Services/auth.service';
import { Router } from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider
} from 'angular-6-social-login';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: ''
  };
  constructor(
    private auth: AuthServiceReg,
    private router: Router,
    private socialAuthService: AuthService
  ) {}

  ngOnInit() {
    
  }
  
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
