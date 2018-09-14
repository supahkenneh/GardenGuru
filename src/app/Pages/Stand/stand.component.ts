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
  noStand: boolean;
  isEdit: boolean = false;
  buildStand: boolean;
  garden;
  showingGarden: boolean = false;
  cropId: string;
  check: boolean = true;
  userIsUser: boolean = false;

  //crop photo values
  cropPhotos: string[] = [];
  //holds photos to upload
  photosToStand: File[] = [];
  //holds photos to carry over to stand
  selectedForStand: string[] = [];

  standFormdata: {
    stand_name: string,
  } = {
      stand_name: ''
    }

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
      this.showingGarden = !this.showingGarden;
    }
  }

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private session: SessionService
  ) {
    this.user = session.getSession();
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (parseInt(this.userId) === this.user.id) {
      this.userIsUser = true
    }
    if (this.user.stand_name) {
      this.backend.getStand(this.userId)
        .then(result => {
          this.sortContacts(result);
          let resultArr = Object.values(result);
          resultArr.map(crop => {
            if (crop.photo.length > 0) {
              crop.displayPhoto = crop.photo[0].link;
            }
          })
        });
    } else {
      this.noStand = !this.noStand;
    }
    this.backend.getGarden()
      .then(result => {
        this.garden = result;
        console.log(this.garden);
        this.garden.map(crop => {
          crop['mainPhoto'] = crop.photo[0].link
        })
      });
  }

  toggleCheck() {
    this.check = !this.check
    this.moveFormData.check = !this.moveFormData.check
  }

  moveToStand() {
    console.log(this.selectedForStand);
    console.log(this.photosToStand);
    this.moveFormData['selectedForStand'] = this.selectedForStand;
    this.moveFormData['uploadForStand'] = this.photosToStand;
    this.backend.moveToStand(this.cropId, this.moveFormData)
      .then(response => {
        this.backend.getGarden()
          .then(result => this.garden = result)
          .then(() => {
            this.ngOnInit();
            this.showGarden();
          });
      })
      .catch(err => console.log(err.message));
  }

  isLoggedIn() {
    return this.session.isLoggedIn;
  }

  turnEditToFalse() {
    this.isEdit = false;
  }

  toggleEdit(crop) {
    if (crop) { this.cropId = crop.id; }
    if (this.isEdit) {
      this.isEdit = !this.isEdit;
    }
    this.garden.map(crop => {
      if (crop.id === this.cropId) {
        this.moveFormData = crop;
        this.cropPhotos = crop.photo;
      }
    })
    this.isEdit = !this.isEdit;
  }

  buildingStand() {
    if (this.buildStand) {
      return this.buildStand = false
    }
    return this.buildStand = true
  }

  showGarden() {
    if (this.showingGarden) {
      return this.showingGarden = false;
    }
    return this.showingGarden = true;
  }

  sortContacts(result) {
    this.crops = result.sort(function (a, b) {
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
    this.backend.editUser(this.standFormdata)
      .then(result => {
        this.user.stand_name = result['stand_name'];
        this.session.setSession(this.user);
        this.noStand = false;
        this.ngOnInit();
      });
  }

  //photo functions
  selectPhoto(event) {
    if (!this.selectedForStand.includes(event.target.src)) {
      this.selectedForStand.push(event.target.src)
      event.target.style.border = '3px solid #2c84fc'
    } else {
      let index = this.selectedForStand.indexOf(event.target.src);
      this.selectedForStand.splice(index, 1);
      event.target.style.border = 'none';
    }
  }

  updatePhotoList(event) {
    let file = event.target.files[0];
    if (!this.photosToStand.includes(file)) {
      return this.photosToStand.push(file);
    }
  }
}
