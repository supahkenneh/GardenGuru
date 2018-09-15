import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  cities: string[] = ['Aiea', 'Ewa Beach', 'Haleiwa', 'Hawaii Kai', 'Honolulu', 'Kaneohe', 'Kahala', 'Kailua', 'Kapolei', 'Manoa', 'Mililani', 'Nanakuli', 'Pearl City', 'Wahiawa', 'Waialua', 'Waimanalo', 'Waipahu']
  states: string[] = ['HI']

  registerFormData: {
    username: string;
    city: string;
    state: string;
    email: string;
    first_name: string;
    last_name: string;
    photo: File
  } = {
      username: '',
      city: '',
      state: '',
      email: '',
      first_name: '',
      last_name: '',
      photo: null
    };
  constructor(private auth: AuthService, private router: Router) { }

  register() {
    this.auth.register(this.registerFormData)
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  getPhotoFile(event) {
    let file = event.target.files[0];
    this.registerFormData.photo = file;
  }
}
