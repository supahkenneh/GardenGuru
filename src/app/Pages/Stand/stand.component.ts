import { Component, OnInit, HostListener } from '@angular/core';
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
  garden;
  isGarden: boolean = false;
  cropId;
  check: boolean = true;
  userIsUser: boolean = false;
  editFormData = {
    stand_name: ''
  };

  moveFormData = {
    description: '',
    details: '',
    price: '',
    inventory: '',
    check: this.check
  };

  @HostListener('document:click', ['$event'])
  clickout(event) {
    document.getElementById('modal-content');
    document.getElementById('content-container');
    if (event.target === document.getElementById('modal-container')) {
      this.isGarden = !this.isGarden;
    }
  }

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService
  ) {
    router.events.subscribe((val)=>{
      this.ngOnInit()
    })
    this.user = session.getSession();
  }

  toggleCheck() {
    this.check = !this.check
    this.moveFormData.check = !this.moveFormData.check
  }

  moveToStand() {
    this.backend
      .moveToStand(this.cropId, this.moveFormData)
      .then(response => {
        this.backend
          .getGarden()
          .then(result => {
            console.log('garden', result)
            this.garden = result;
          })
          .then(() => {
            this.ngOnInit();
            this.toggleGarden();
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  isLoggedIn() {
    return this.session.isLoggedIn;
  }

  turnEditToFalse() {
    this.isEdit = false;
  }

  toggleEdit(crop) {
    if (crop) {
      this.cropId = crop.id;
    }
    if (this.isEdit) {
      this.isEdit = !this.isEdit;
    }
    this.isEdit = !this.isEdit;
  }

  toggleGarden() {
    this.isGarden = !this.isGarden;
  }

  sortCrops(result) {
    this.crops = result.sort(function(a, b) {
      var textA = a.description;
      var textB = b.description;
      return textA > textB;
    });
  }

  deleteCrop(id) {
    this.backend.deleteCrop(id).then(result => {
      this.ngOnInit();
    });
  }

  editUser() {
    // console.log()
    this.backend.editUser(this.editFormData).then(result => {
      this.user.stand_name = result['stand_name'];
      this.session.setSession(this.user);
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.user.id, this.userId)
    if(parseInt(this.userId) === this.user.id){
      this.userIsUser = true
    }
    if (this.user.stand_name) {
      this.backend.getStand(this.userId).then(result => {
        this.sortCrops(result);
      });
    } else {
      this.noStand = !this.noStand;
    }
    this.backend.getGarden().then(result => {
      this.garden = result;
    });
  }
}
