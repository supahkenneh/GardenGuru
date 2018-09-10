import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: string;

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit() {
    return this.backend.getUserProfile(this.userId)
      .then(result => {
        console.log('result :', result);
      })
  }
}
