import { Component, OnInit } from '@angular/core';
import { AuthServiceReg} from '../../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: boolean = false;

  loginFormData: {
    username: string,
    password: string
  } = {
      username: '',
      password: ''
    };

  constructor(private auth: AuthServiceReg, private router: Router) { }
  

  ngOnInit() {

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '327250618030397',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  submitLogin() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        //login success
        //login success code here
        //redirect to home page
        return this.router.navigate(['/marketplace']);
      }
      else {
        console.log('User login failed');
      }
    });
  }

  login() {
    return this.auth
      .login(this.loginFormData)
      .then(response => {
        return this.router.navigate(['/garden']);
      })
      .catch(err => {
        this.loginError = true;
        console.log(err);
      });
  }
}
