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
  stands
  crops

  constructor(
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
  }

  ngOnInit() {
    return this.backend.getMarketplace()
      .then(result => {
        this.stands = result
        console.log(this.stands)
      })
      .then(()=>{
        return this.backend.getMarketplaceCrops()
        .then(crops=>{
          this.crops = crops
          console.log('crops',this.crops)
        })
      })
  }
}
