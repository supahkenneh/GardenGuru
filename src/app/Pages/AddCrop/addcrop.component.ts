import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';

@Component({
  templateUrl: './addcrop.component.html',
  styleUrls: ['./addcrop.component.scss']
})
export class AddCropComponent implements OnInit {
  user: object;
  loggedIn: boolean = false;

  plants: any;

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  years: number[] = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

  cropFormData: {
    plant: string;
    watering: number;
    month: string;
    day: number;
    year: number;
  } = {
      plant: '',
      watering: 0,
      month: '',
      day: 0,
      year: 0
    }

  constructor(
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
    this.loggedIn = this.session.isLoggedIn();
  }

  ngOnInit() {
    console.log('getting plants');
  }

  addCrop() {
    console.log('hi');
    const date = `${this.cropFormData.month} ${this.cropFormData.day} ${this.cropFormData.year}`;
    console.log('date :', date);
  }
}
