import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';

@Component({
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  user: object;
  loggedIn: boolean = false;
  stands;
  crops;
  recentlyAddedCrops;
  placeholderImg: string = 'https://www.myfirestorm.com/img/placeholder_user.png'

  constructor(
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
  }

  ngOnInit() {
    if (this.loggedIn) {
      return this.backend.getMarketplace()
        .then(result => {
          console.log('stands ', result);
          let resultArr = Object.values(result);
          resultArr.map(stand => {
            if (!stand.avatar_link) {
              stand.avatar_link = this.placeholderImg
            }
          })
          this.stands = resultArr;
        })
        .then(() => {
          return this.backend.getMarketplaceCrops()
            .then(crops => {
              console.log('crops ', crops)
              this.crops = crops;
            });
        });
    } else {
      return this.backend.getRecentCrops()
        .then(result => {
          this.recentlyAddedCrops = result
          console.log(result)
        })
    }
  }
}
