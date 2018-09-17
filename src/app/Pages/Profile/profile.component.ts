import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';
import { ActivatedRoute } from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

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


  passwordFormData: {
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

  profileFormData: {
    bio: string,
    photo: File
  } = {
      bio: '',
      photo: null
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

  submitChanges() {
    if (this.changingPass) {
      this.passwordFormData['id'] = this.user.id
      return this.backend.editUserProfile(this.passwordFormData)
        .then(result => {
          if (result['success'] = false) {
            this.changingPass = false;
          } else {
            this.ngOnInit()
            this.changingPass = false;
            this.showingSettings = false;
          }
        })
    } else if (this.changingLocation) {
      this.locationFormData['id'] = this.user.id
      return this.backend.editUserProfile(this.locationFormData)
        .then(result => {
          if (result['success'] = false) {
            this.changingLocation = false;
          } else {
            this.ngOnInit();
            this.changingLocation = false;
            this.showingSettings = false;
          }
        })
    } else if (this.changingStandName) {
      this.standFormData['id'] = this.user.id
      return this.backend.editUserProfile(this.standFormData)
        .then(result => {
          if (result['success'] = false) {
            this.changingStandName = false
          } else {
            this.ngOnInit();
            this.changingStandName = false;
            this.showingSettings = false;
          }
        })
    } else if (this.changingProfilePic) {
      this.profileFormData['id'] = this.user.id
      return this.backend.editUserProfile(this.profileFormData)
        .then(result => {
          if (result['success'] = false) {
            this.changingProfilePic = false;
          } else {
            this.ngOnInit();
            this.changingProfilePic = false;
            this.showingSettings = false;
          }
        })
    }
  }

  showSettings() {
    if (this.showingSettings && this.changingLocation) {
      return this.changingLocation = false;
    } else if (this.showingSettings && this.changingPass) {
      return this.changingPass = false;
    } else if (this.showingSettings && this.changingProfilePic) {
      return this.changingProfilePic = false;
    } else if (this.showingSettings && this.changingStandName) {
      return this.changingStandName = false;
    } else if (this.showingSettings && (
      !this.changingPass &&
      !this.changingLocation &&
      !this.changingProfilePic &&
      !this.changingStandName
    )) {
      return this.showingSettings = false;
    } else {
      return this.showingSettings = true
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

  cancel() {
    this.changingLocation = false;
    this.changingPass = false;
    this.changingProfilePic = false;
    this.changingStandName = false;
  }

  saveNewPhoto(event) {
    this.profileFormData.photo = event.target.files[0];
  }
}
