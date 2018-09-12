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

  plants: any;
  plantDescription: string = '';

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  years: number[] = [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]
  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

  //value of watering is number of days
  cropFormData: {
    plant: number;
    watering: number;
    month: string;
    day: number;
    year: number;
    garden_description: string;
  } = {
      plant: 0,
      watering: 0,
      month: '',
      day: 0,
      year: 0,
      garden_description: ''
    }

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private router: Router
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
  }

  ngOnInit() {
    return this.backend.getPlants()
      .then(plants => {
        this.plants = plants;
        console.log(this.plants);
      })
  }

  addCrop() {
    return this.backend.addCrop(this.cropFormData)
      .then(result => {
        return this.router.navigate(['/garden'])
      })
  }

  showPlantInfo() {
    let id = this.cropFormData.plant
    this.plants.map(plant => {
      if (Number(id) === plant.id) {
        return this.plantDescription = plant.description;
      }
    })
  }

  getPlantDescription() {
    return this.plantDescription;
  }
}
