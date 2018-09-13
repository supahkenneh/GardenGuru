import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import {SessionService} from '../../Services/session.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: string;
  user
  constructor(
    private backend: BackendService,
    private session: SessionService
  ) { 
    this.user = this.session.getSession()
  }

  ngOnInit() {
    console.log(this.user)
  //   return this.backend.getUserProfile(this.userId)
  //     .then(result => {
  //       this.user = result
  //       console.log(result)
  //     })
  // }
  }
}
