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
export class LoginComponent {
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
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        return this.auth.oauthLogin(userData)
        
        // this.router.navigate(['/marketplace']);
        // .then(()=>{
        //   console.log('hi')
        // })
      }
    );
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
