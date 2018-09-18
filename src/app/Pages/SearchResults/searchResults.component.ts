import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './searchResults.component.html',
  styleUrls: ['./searchResults.component.scss']
})

export class SearchResultsComponent implements OnInit {
  user: object;
  loggedIn: boolean = false;
  searchResults: any[] = [];

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private router: Router
  ) {
    this.user = this.session.getSession();
    router.events.subscribe(val => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.searchResults = this.backend.transferResults();
  }

  getResultLength() {
    return `${this.searchResults.length} item(s) found`
  }
}