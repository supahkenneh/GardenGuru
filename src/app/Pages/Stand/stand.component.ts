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
  noStand;
  isEdit: boolean = false;
  garden
  editFormData = {
    stand_name: ''
  };

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

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  sortContacts(result) {
    this.crops = result.sort(function(a, b) {
      var textA = a.description;
      var textB = b.description;
      return textA > textB;
    });
  }

  deleteCrop(id) {
    this.backend.deleteCrop(id).then(result => {
      // console.log(result);
      this.ngOnInit();
    });
  }

  editUser() {
    this.backend.editUser(this.editFormData).then(result => {
      this.user.stand_name = result['stand_name'];
      this.session.setSession(this.user);
      this.ngOnInit();
    });
  }

  ngOnInit() {
    console.log(this.user);
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.user.stand_name) {
      this.backend.getStand(this.userId).then(result => {
        this.sortContacts(result);
      })
    } else {
      this.noStand = !this.noStand;
    }
    this.backend.getGarden()
    .then(result=>{
      this.garden = result[0]
    })
  }
  
}
