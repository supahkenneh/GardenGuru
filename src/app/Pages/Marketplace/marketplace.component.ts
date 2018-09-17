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

  constructor(
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
  }

  ngOnInit() {
    if (this.loggedIn) {
      return this.backend
        .getMarketplace()
        .then(result => {
          this.stands = result;
        })
        .then(() => {
          return this.backend.getMarketplaceCrops().then(crops => {
            this.crops = crops;
          });
        });
    }else {
      return this.backend.getRecentCrops()
      .then(result=>{
        this.recentlyAddedCrops = result
        console.log(result)
      })
    }
  }
}
