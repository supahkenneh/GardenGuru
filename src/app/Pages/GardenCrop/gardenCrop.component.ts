import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../Services/session.service';
import { AuthService } from '../../Services/auth.service';
@Component({
  templateUrl: './gardenCrop.component.html',
  styleUrls: ['./gardenCrop.component.scss']
})
export class GardenCropComponent implements OnInit {
  user: object;
  cropId: string;
  loggedIn: boolean = false;
  crop: object;
  date: any;

  //view switchers
  gardenEditing: boolean = false;

  //handles water and harvesting, converted/parsed dates only
  wateringDate: string;
  harvestDate: string;
  newWaterDate: any;

  //photo stuff
  photos: string[] = [];
  currentPhoto: string;
  hasPhoto: boolean = false;
  photosToDelete: string[] = [];

  //form data
  gardenEditFormData: {
    garden_description: string,
    watering_interval: number,
  } = {
      garden_description: '',
      watering_interval: 0,
    }


  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private session: SessionService,
    private auth: AuthService,
    private router: Router
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
    this.date = new Date();
  }

  ngOnInit() {
    this.cropId = this.route.snapshot.paramMap.get('id');
    return this.backend.getCrop(this.cropId)
      .then(result => {
        this.crop = result;
        // this.crop['mainPhoto'] = result['photo'][0].link;
        //gets photo links to be displayed on page
        if (this.crop['photo'].length > 0) {
          this.crop['photo'].map(photo => {
            this.photos.push(photo.link);
          })
          this.currentPhoto = this.photos[0];
          this.hasPhoto = true;
        } else {
          this.hasPhoto = false;
        }
        //parsing date
        this.wateringDate = result['watering_date'];
        this.wateringDate = this.crop['watering_date'].slice(0, 10);
        this.harvestDate = this.crop['harvest_date'].slice(0, 10);
      });
  }

  deleteCrop() {
    this.backend.deleteCrop(this.cropId)
      .then(result => {
        if (result['success']) {
          return this.router.navigate(['/garden'])
        }
      });
  }

  editGardenCrop() {
    this.gardenEditing = true;
    this.gardenEditFormData.watering_interval = this.crop['watering_interval']
    this.gardenEditFormData.garden_description = this.crop['garden_description']
  }

  submitGardenEdit() {
    this.gardenEditFormData['newWaterDate'] = this.newWaterDate;
    this.gardenEditFormData['id'] = this.cropId;
    return this.backend.editGardenCrop(this.gardenEditFormData)
      .then(result => {
        this.ngOnInit();
        this.gardenEditing = false;
      })
  }

  moveToStand() {
    console.log('stand');
  }

  cancel() {
    this.gardenEditing = false;
  }

  recalculateDate(date, days) {
    let newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + Number(days),
    )
    let dateToModify = newDate.toLocaleDateString();
    let newDay = ('0' + new Date(dateToModify).getDate()).slice(-2);
    let newMonth = ('0' + (new Date(dateToModify).getMonth() + 1)).slice(-2);
    let newYear = new Date(dateToModify).getFullYear();
    let modifiedDate = `${newYear}-${newMonth}-${newDay}`
    return this.newWaterDate = modifiedDate;
  }

  getNewWaterDate() {
    if (this.newWaterDate) {
      return this.newWaterDate;
    }
    return this.wateringDate;
  }

  //photo carousel
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

  tagForRemoval() {
    if (this.photosToDelete.length < this.photos.length) {
      return this.photosToDelete.push(this.currentPhoto);
    }
  }

  getPhotosToDelete() {
    if (this.photosToDelete.length !== 0 && this.photosToDelete.length < this.photos.length) {
      return `${this.photosToDelete.length} images selected`;
    } else if (this.photosToDelete.length >= this.photos.length) {
      this.photosToDelete = this.photos
      return `${this.photosToDelete.length} images selected`
    } else {
      document.getElementById('photos-marked').style.display === 'none';
    }
  }
}
