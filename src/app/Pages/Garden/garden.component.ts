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

  garden: object[] = [];
  plantsToWater: object[] = [];

  constructor(
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
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
            crop.mainPhoto = crop.photo[0].link;
            this.garden.push(crop);
          }
        })
        return resultArr
      })
      .then(() => {
        let gardenArr = Object.values(this.garden)
        gardenArr.map(crop => {
          if (crop['watering_interval'] < 24) {
            this.plantsToWater.push(crop);
          }
        })
      })
  }
}
