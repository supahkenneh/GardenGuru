import { Component, OnInit, HostListener } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../Services/session.service';
@Component({
  templateUrl: './stand.component.html',
  styleUrls: ['./stand.component.scss']
})
export class StandComponent implements OnInit {
  urlId;
  crops;
  user;
  standOwner: object;
  noStand: boolean;
  isEdit: boolean = false;
  buildStand: boolean;
  garden;
  showingGarden: boolean = false;
  cropId: string;
  check: boolean = true;
  userIsUser: boolean = false;
  postingCrop: boolean = false;

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

  postFormData: {
    plant: number;
    description: string,
    price: string,
    inventory: number,
    details: string,
    photos: File[]
  } = {
      plant: 0,
      description: '',
      price: '',
      inventory: null,
      details: '',
      photos: []
    }

  plants: any;

  @HostListener('click', ['$event'])
  clickout(event) {
    if (event.target === document.getElementById('modal-container')) {
      this.showingGarden = !this.showingGarden;
    }
    if (event.target === document.getElementById('add-modal-container')) {
      this.postingCrop = !this.postingCrop
    }
  }



  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute,
    private session: SessionService
  ) {
    this.user = session.getSession();
  }

  ngOnInit() {
    this.urlId = this.route.snapshot.paramMap.get('id');
    //checks to see if the page belongs to logged in user
    if (parseInt(this.urlId) === this.user.id) {
      this.userIsUser = true
    }
    //check to see if logged in user has a stand
    if (this.user.stand_name) {
      this.backend.getStand(this.urlId)
        .then(result => {
          console.log(result)
          if (result['message']) {
            this.noStand = true;
          } else {
            this.standOwner = result[0].user;
            this.sortContacts(result);
            let resultArr = Object.values(result);
            resultArr.map(crop => {
              if (crop.photo.length > 0) {
                crop.displayPhoto = crop.photo[0].link;
              }
            })
          }
        });
    } else {
      this.noStand = !this.noStand;
    }
    this.backend.getGarden()
      .then(result => {
        this.garden = result;
        this.garden.map(crop => {
          if (crop.photo.length > 0) {
            crop['mainPhoto'] = crop.photo[0].link
          }
        })
      });
  }

  addToStand() {
    return this.backend.postDirectlyToStand(this.postFormData)
      .then(result => {
        this.showPostForm();
        this.ngOnInit()
      })
  }

  toggleCheck() {
    this.check = !this.check
    this.moveFormData.check = !this.moveFormData.check
  }

  moveToStand() {
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

  showPostForm() {
    if (this.postingCrop) {
      return this.postingCrop = false;
    }
    this.backend.getPlants()
      .then(result => {
        console.log(result);
        this.plants = result;
        return this.postingCrop = true;
      })
  }

  startConversation() {

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
    if (this.postingCrop) {
      this.postFormData.photos.push(file);
    } else if (this.showingGarden) {
      return this.photosToStand.push(file);
    }
  }
}
