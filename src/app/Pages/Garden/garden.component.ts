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

  garden: object[] = [];
  plantsToWater: object[] = [];

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
        console.log('result :', result);
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
        console.log(this.garden);
        return resultArr
      })
      .then(() => {
        let gardenArr = Object.values(this.garden)
        gardenArr.map(crop => {
          console.log(this.date);
          console.log(crop['watering_date']);
          let index = crop['watering_date'].indexOf('T');
          let subWaterDate = crop['watering_date'].substring(0, index);
          console.log('sub ', subWaterDate);
          if (subWaterDate === this.date) {
            this.plantsToWater.push(crop);
          }
        })
      })
  }
}
