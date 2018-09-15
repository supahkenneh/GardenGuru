import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';

@Component({
  templateUrl: './searchResults.component.html',
  styleUrls: ['./searchResults.component.scss']
})

export class SearchResultsComponent implements OnInit {
  user: object;
  loggedIn: boolean = false;
  searchResults: any;
  searchParams: any;

  constructor(
    private backend: BackendService,
    private session: SessionService
  ) {
    this.user = this.session.getSession();
  }

  ngOnInit() {
    console.log('ye', this.getSearchResults())
    return this.getSearchResults()
  }
  
  getSearchResults() {
    return this.backend.transferResults()
  }
}