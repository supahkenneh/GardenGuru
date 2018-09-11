import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {
  userId: string;
  id
  loggedIn: boolean = false;
  crop

  constructor(private backend: BackendService, private route: ActivatedRoute) {}
 
  ngOnInit() {
    console.log('hi')
    this.id = this.route.snapshot.paramMap.get('id');
    return this.backend.getCrop(this.id)
    .then(result => {
      console.log(typeof result)
      return this.crop = result
    });
  }
}
