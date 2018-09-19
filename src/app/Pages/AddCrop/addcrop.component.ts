import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './addcrop.component.html',
  styleUrls: ['./addcrop.component.scss']
})
export class AddCropComponent implements OnInit {
  user: object;
  loggedIn: boolean = false;
  year: any;
  month: any;
  day: any;

  plants: any;
  plantDescription: string = '';
  plantNames: string[] = [];

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  years: number[] = [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]
  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

  //value of watering is number of days
  cropFormData: {
    plant: string;
    watering: number;
    month: string;
    day: string;
    year: string;
    garden_description: string;
    photo: File[];
  } = {
      plant: '',
      watering: 0,
      month: '',
      day: '',
      year: '',
      garden_description: '',
      photo: []
    }

  photosToUpload: File[] = [];
  acceptableExtensions: string[] = ['.jpg', '.png', '.jpeg']
  acceptableSize: number = 1000000000;
  showPhotoError: boolean = false;
  unacceptablePhoto: string = 'File format not accepted, please upload .jpg, .jpeg, or .png';
  unacceptableSize: string = 'File size exceeded, max 1GB'
  photoErrors: string[] = [];

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private router: Router
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
    this.year = new Date().getFullYear();
    this.month = ('0' + (new Date().getMonth() + 1)).slice(-2);
    this.day = ('0' + (new Date().getDate())).slice(-2);
  }

  ngOnInit() {
    return this.backend.getPlants()
      .then(plants => {
        let plantsArr = Object.values(plants);
        plantsArr.map(plant => {
          this.plantNames.push(plant.name);
        })
        this.plantNames = this.plantNames.sort();
        this.plants = plants;
      })
  }

  getPlantInfo() {
  }

  addCrop() {
    let plantArr = Object.values(this.plants);
    plantArr.map(plant => {
      if (plant['name'] === this.cropFormData.plant) {
        this.cropFormData.plant = plant['id']
      }
    })
    console.log(this.cropFormData);
    return this.backend.addCrop(this.cropFormData)
      .then(result => {
        return this.router.navigate(['/garden'])
      })
  }

  showPlantInfo() {
    // let id = this.cropFormData.plant
    // this.plants.map(plant => {
    //   if (Number(id) === plant.id) {
    //     return this.plantDescription = plant.description;
    //   }
    // })
    let plantArr = Object.values(this.plants);
    plantArr.map(plant => {
      if (plant['name'] === this.cropFormData.plant) {
        return this.plantDescription = plant['description'];
      }
    })
  }

  getPlantDescription() {
    return this.plantDescription;
  }

  selectToday() {
    this.cropFormData.year = this.year;
    this.cropFormData.month = this.months[Number(this.month) - 1];
    this.cropFormData.day = this.day;
  }

  updatePhotoList(event) {
    let file = event.target.files[0];
    let fileSize = file.size
    let dot = file.name.indexOf('.');
    let extension = file.name.slice(dot, file.name.length);
    if (this.acceptableExtensions.includes(extension.toLowerCase())) {
      if (fileSize < this.acceptableSize) {
        return this.cropFormData.photo.push(file)
      } else {
        return this.photoErrors.push(this.unacceptableSize);
      }
    } else {
      return this.photoErrors.push(this.unacceptablePhoto)
    }
  }

  getPhotoErrors() {
    return this.photoErrors.join(', ');
  }
}
