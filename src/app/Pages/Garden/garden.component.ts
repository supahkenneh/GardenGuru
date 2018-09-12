import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';

@Component({
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {
  user: object;
  loggedIn: boolean = false;
  date: string;
  //for parsing date objects and dates in data
  index: number = 10;

  garden: object[] = [];
  plantsToWater: object[] = [];
  plantsToHarvest: object[] = [];

  constructor(
    private backend: BackendService,
    private session: SessionService,
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
    let year = new Date().getFullYear();
    let month = ('0' + (new Date().getMonth() + 1)).slice(-2);
    let day = ('0' + (new Date().getDate())).slice(-2);
    this.date = `${year}-${month}-${day}`
  }

  ngOnInit() {
    //resets garden
    this.garden.length = 0;
    return this.backend.getGarden()
      .then(result => {
        let resultArr = Object.values(result);
        resultArr.map(crop => {
          //show only crops that are growing
          if (crop.cropStatus['name'] === 'Growing') {
            if (crop.photo.length > 0) {
              crop.mainPhoto = crop.photo[0].link;
            }
            this.garden.push(crop);
          }
        })
        return resultArr
      })
      .then(() => {
        let gardenArr = Object.values(this.garden)
        gardenArr.map(crop => {
          let subWaterDate = crop['watering_date'].substring(0, this.index);
          if (subWaterDate === this.date) {
            this.plantsToWater.push(crop);
          }
        })
      })
      .then(() => {
        let gardenArr = Object.values(this.garden);
        gardenArr.map(crop => {
          let subHarvestDate = crop['harvest_date'].substring(0, this.index);
          if (subHarvestDate === this.date) {
            this.plantsToHarvest.push(crop);
          }
        })
      })
  }
}
