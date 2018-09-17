import { Component } from '@angular/core';
import { AuthServiceReg} from '../../Services/auth.service';
import { Router } from '@angular/router';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';

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
    password: string;
    city: string;
    state: string;
    email: string;
    first_name: string;
    last_name: string;
    photo: File
  } = {
      username: '',
      password: '',
      city: '',
      state: '',
      email: '',
      first_name: '',
      last_name: '',
      photo: null
    };
  constructor(
    private auth: AuthServiceReg, 
    private router: Router,
    private backend: BackendService,
    private session: SessionService
  ) { }

  register() {
    return this.auth.register(this.registerFormData)
      .then(result => {
        if (result['success']) {
          return result;
        }
        //error handling here for failed registration
      })
      .then(() => {
        let login = {
          username: this.registerFormData.username,
          password: this.registerFormData.password
        }
        return this.backend.login(login)
      })
      .then(result => {
        if(result) {
          this.session.setSession(result)
          return this.router.navigate(['/marketplace'])
        }
      })
  }

  getPhotoFile(event) {
    let file = event.target.files[0];
    this.registerFormData.photo = file;
  }
}
