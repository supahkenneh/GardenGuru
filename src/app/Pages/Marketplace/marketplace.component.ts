import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';

@Component({
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  constructor(private backend: BackendService) { }

  ngOnInit() {
    console.log('show marketplace');
    return this.backend.getMarketplace()
      .then(result => {
        console.log('result :', result);
      })
  }
}
