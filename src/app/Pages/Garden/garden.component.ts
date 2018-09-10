import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';

@Component({
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {
  userId: string;
  loggedIn: boolean = false;

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit() {
    return this.backend.getGarden()
      .then(result => {
        console.log(result);
      })
  }
}
