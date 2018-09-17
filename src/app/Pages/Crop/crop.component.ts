import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../Services/session.service';
import { AuthServiceReg} from '../../Services/auth.service';
@Component({
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {
  userId: string;
  cropId;
  loggedIn: boolean = false;
  crop: object;
  user

  standEditing: boolean = false;

  //photo stuff
  photos: string[] = [];
  currentPhoto: string;
  hasPhoto: boolean = false;
  photosToDelete: string[] = [];
  photosToUpload: File[] = [];

  standCropFormData: {
    description: string,
    price: string,
    inventory: number,
    details: string;
  } = {
      description: '',
      price: '',
      inventory: null,
      details: ''
    }

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private auth: AuthServiceReg
  ) {
    this.user = session.getSession();
    this.loggedIn = this.session.isLoggedIn();
  }

  ngOnInit() {
    this.cropId = this.route.snapshot.paramMap.get('id');
    return this.backend.getCrop(this.cropId)
      .then(result => {
        this.crop = result;
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

  deleteCrop() {
    this.backend.deleteCrop(this.cropId)
      .then(result => {
        return this.router.navigate([`/user/${this.crop['owner_id']}/stand`])
      })
  }

  editCrop() {
    if (this.standEditing) {
      return this.standEditing = false;
    }
    this.standCropFormData.description = this.crop['description'];
    this.standCropFormData.price = this.crop['price'];
    this.standCropFormData.inventory = this.crop['inventory']
    this.standCropFormData.details = this.crop['details']
    return this.standEditing = true;
  }

  submitStandCropEdit() {
    if (this.photosToDelete) {
      this.standCropFormData['photosToDelete'] = this.photosToDelete;
    }
    if (this.photosToUpload) {
      this.standCropFormData['photos'] = this.photosToUpload;
    }
    this.standCropFormData['id'] = this.cropId;
    return this.backend.editStandCrop(this.standCropFormData)
      .then(result => {
        // this.crop = result[0];
        //resetting values
        this.photos.length = 0;
        this.photosToUpload.length = 0;
        this.photosToDelete.length = 0;
        this.ngOnInit();
        this.standEditing = false;
      })
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

  tagForRemoval() {
    if (this.photosToDelete.length < this.photos.length) {
      return this.photosToDelete.push(this.currentPhoto);
    }
  }

  updatePhotoList(event) {
    let file = event.target.files[0];
    if (!this.photosToUpload.includes(file)) {
      return this.photosToUpload.push(file);
    }
  }
}
