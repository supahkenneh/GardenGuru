import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';

@Component({
  templateUrl: './stand.component.html',
  styleUrls: ['./stand.component.scss']
})
export class StandComponent implements OnInit {
  userId: string

  constructor(private backend: BackendService) { }

  ngOnInit() {
    return this.backend.getStand(this.userId)
      .then(result => {
        console.log('result :', result);
      })
  }

}
