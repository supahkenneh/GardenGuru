import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../Services/session.service';
import { AuthService } from '../../Services/auth.service';
@Component({
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {
  userId: string;
  id;
  loggedIn: boolean = false;
  crop: object;
  user

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private session: SessionService,
    private auth: AuthService
  ) {
    this.user = session.getSession();
  }

  isLoggedIn() {
    return this.session.isLoggedIn();
  }

  deleteCrop() {
    this.backend.deleteCrop(this.id)
      .then(result => {
        this.ngOnInit()
      })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    return this.backend.getCrop(this.id)
      .then(result => {
        return this.crop = result;
      });
  }
}
