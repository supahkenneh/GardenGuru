import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: string;
  user: any;
  profile: any;

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private route: ActivatedRoute
  ) {
    this.user = this.session.getSession()
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    return this.backend.getUserProfile(this.userId)
      .then(user => {
        console.log(user);
        this.profile = user;
      })
  }
}
