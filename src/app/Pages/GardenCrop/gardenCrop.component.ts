import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../Services/session.service';
import { AuthService } from '../../Services/auth.service';
@Component({
  templateUrl: './gardenCrop.component.html',
  styleUrls: ['./gardenCrop.component.scss']
})
export class GardenCropComponent implements OnInit {
  user: object;
  cropId: string;
  loggedIn: boolean = false;
  crop: object;
  date: any;

  wateringDate: string;
  harvestDate: string;

  gardenEditing: boolean = false;
  standPosting: boolean = false;

  gardenEditFormData: {
    garden_description: string,
    watering_interval: number,
  } = {
      garden_description: '',
      watering_interval: 0,
    }

  newWaterDate: any;

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private session: SessionService,
    private auth: AuthService,
    private router: Router
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
    this.date = new Date();
  }

  ngOnInit() {
    this.cropId = this.route.snapshot.paramMap.get('id');
    return this.backend.getCrop(this.cropId)
      .then(result => {
        this.crop = result;
        this.crop['mainPhoto'] = result['photo'][0].link;
        this.wateringDate = result['watering_date'];
        this.wateringDate = this.crop['watering_date'].slice(0, 10);
        this.harvestDate = this.crop['harvest_date'].slice(0, 10);
      });
  }

  deleteCrop() {
    this.backend.deleteCrop(this.cropId)
      .then(result => {
        if (result['success']) {
          return this.router.navigate(['/garden'])
        }
      });
  }

  editGardenCrop() {
    this.gardenEditing = true;
    this.gardenEditFormData.watering_interval = this.crop['watering_interval']
    this.gardenEditFormData.garden_description = this.crop['garden_description']
  }

  submitGardenEdit() {
    this.gardenEditFormData['newWaterDate'] = this.newWaterDate;
    this.gardenEditFormData['id'] = this.cropId;
    return this.backend.editGardenCrop(this.gardenEditFormData)
      .then(result => {
        this.ngOnInit();
        this.gardenEditing = false;
      })
  }

  moveToStand() {
    console.log('stand');
  }

  cancel() {
    this.gardenEditing = false;
    this.standPosting = false;
  }

  recalculateDate(date, days) {
    let newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + Number(days),
    )
    let dateToModify = newDate.toLocaleDateString();
    let newDay = ('0' + new Date(dateToModify).getDate()).slice(-2);
    let newMonth = ('0' + (new Date(dateToModify).getMonth() + 1)).slice(-2);
    let newYear = new Date(dateToModify).getFullYear();
    let modifiedDate = `${newYear}-${newMonth}-${newDay}`
    return this.newWaterDate = modifiedDate;
  }

  getNewWaterDate() {
    return this.newWaterDate;
  }
}
