import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../Services/session.service';
import { AuthService } from '../../Services/auth.service';
@Component({
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {
  userId: string;
  id;
  loggedIn: boolean = false;
  crop: object;
  user

  //photo stuff
  photos: string[] = [];
  currentPhoto: string;
  hasPhoto: boolean = false;

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private session: SessionService,
    private auth: AuthService
  ) {
    this.user = session.getSession();
    this.loggedIn = this.session.isLoggedIn();
  }

  deleteCrop() {
    this.backend.deleteCrop(this.id)
      .then(result => {
        this.ngOnInit()
      })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    return this.backend.getCrop(this.id)
      .then(result => {
        this.crop = result;
        console.log(this.crop);
        if (this.crop['photo'].length > 0) {
          this.crop['photo'].map(photo => {
            this.photos.push(photo.link);
          })
          this.currentPhoto = this.photos[0];
          this.hasPhoto = true;
        } else {
          this.hasPhoto = false;
        }
      });
  }

  //photo handlers
  previousPhoto() {
    let index = this.photos.indexOf(this.currentPhoto);
    if ((index - 1) < 0) {
      return this.currentPhoto = this.photos[this.photos.length - 1]
    }
    return this.currentPhoto = this.photos[index - 1]
  }

  nextPhoto() {
    let index = this.photos.indexOf(this.currentPhoto);
    if ((index + 1) === this.photos.length) {
      return this.currentPhoto = this.photos[0]
    }
    return this.currentPhoto = this.photos[index + 1]
  }

  imageCounter() {
    let index = this.photos.indexOf(this.currentPhoto);
    return `${index + 1} of ${this.photos.length} images`
  }

}
