import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  urlId: string;
  user: any;
  profile: any;
  correctUser: boolean = false;
  showingSettings: boolean = false;
  changingPass: boolean = false;
  changingLocation: boolean = false;
  changingStandName: boolean = false;
  changingProfilePic: boolean = false;

  cities: string[] = ['Aiea', 'Ewa Beach', 'Haleiwa', 'Hawaii Kai', 'Honolulu', 'Kaneohe', 'Kahala', 'Kailua', 'Kapolei', 'Manoa', 'Mililani', 'Nanakuli', 'Pearl City', 'Wahiawa', 'Waialua', 'Waimanalo', 'Waipahu']
  states: string[] = ['HI']


  passwordFormdata: {
    oldPass: string,
    newPass: string,
    valPass: string,
  } = {
      oldPass: '',
      newPass: '',
      valPass: ''
    }

  locationFormData: {
    city: string,
    state: string,
  } = {
      city: '',
      state: '',
    }

  standFormData: {
    stand_name: string,
  } = {
      stand_name: '',
    }

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private route: ActivatedRoute
  ) {
    this.user = this.session.getSession();
    this.locationFormData = this.user;
    this.standFormData = this.user;
  }

  ngOnInit() {
    this.urlId = this.route.snapshot.paramMap.get('id');
    //check to see if user owns that profile
    if (this.urlId === `${this.user.id}`) {
      this.correctUser = true;
    }
    return this.backend.getUserProfile(this.urlId)
      .then(user => {
        this.profile = user;
      })
  }

  showSettings() {
    if (this.showingSettings) {
      return this.showingSettings = false
    } else {
      this.showingSettings = true
    }
  }

  handleSettings(event) {
    switch (event.target.innerHTML) {
      case 'Change Password':
        this.changingPass = true;
        break;
      case 'Change Location':
        this.changingLocation = true;
        break;
      case 'Change Stand Name':
        this.changingStandName = true;
        break;
      case 'Change Profile Picture':
        this.changingProfilePic = true;
        break;
      default:
        this.changingLocation = false;
        this.changingPass = false;
        this.changingProfilePic = false;
        this.changingStandName = false;
        break;
    }
  }

  submitChanges() {
  }

  cancel() {
    this.changingLocation = false;
    this.changingPass = false;
    this.changingProfilePic = false;
    this.changingStandName = false;
  }
}
