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
  editFormData = {
    stand_name: ''
  };

  moveFormData = {
    description: '',
    details: '',
    price: '',
    inventory: '',
    
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
    private session: SessionService
  ) {
    this.user = session.getSession();
  }
  moveToStand() {
    console.log(this.cropId, 'move form data')

    this.backend.moveToStand(this.cropId, this.moveFormData).then(response => {
      this.backend.getGarden().then(result => {
        this.garden = result;
      })
      .then(()=>{
        this.ngOnInit()
        this.toggleGarden()
      })
    })
    .catch(err=>{
      console.log(err.message)
    })
  }
  isLoggedIn() {
    return this.session.isLoggedIn;
  }

  turnEditToFalse() {
    this.isEdit = false;
  }

  toggleEdit(crop) {
    console.log('toggledit')
    if(crop){
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
    // console.log()
    this.backend.editUser(this.editFormData).then(result => {
      this.user.stand_name = result['stand_name'];
      this.session.setSession(this.user);
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.user.stand_name) {
      this.backend.getStand(this.userId).then(result => {
        this.sortContacts(result);
      });
    } else {
      this.noStand = !this.noStand;
    }
    this.backend.getGarden().then(result => {
      this.garden = result;
    });
  }
}
