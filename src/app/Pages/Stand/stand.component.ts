import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../Services/session.service';
@Component({
  templateUrl: './stand.component.html',
  styleUrls: ['./stand.component.scss']
})
export class StandComponent implements OnInit {
  userId;
  crops;
  user;
  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private session: SessionService
  ) {
    this.user = session.getSession();
  }

  isLoggedIn() {
    return this.session.isLoggedIn;
  }

  sortContacts(result) {
    this.crops = result.sort(function(a, b) {
      var textA = a.description;
      var textB = b.description;
      return textA > textB;
    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    return this.backend.getStand(this.userId).then(result => {
      this.sortContacts(result);
      console.log(result)
    });
  }
}
