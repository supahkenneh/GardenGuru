import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerFormData: {
    username: string;
    name: string;
    city: string;
    state: string;
  } = {
    username: '',
    name: '',
    city: '',
    state: ''
  };
  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.registerFormData).then(() => {
      this.router.navigate(['login']);
    });
  }
}
