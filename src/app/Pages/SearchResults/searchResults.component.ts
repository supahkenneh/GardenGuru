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
  searchResult: any;

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
    // console.log('getSearchResults()', this.getSearchResults())
    return this.getSearchResults()
  }
  
  getSearchResults() {
    this.searchResults = this.backend.transferResults();
    // console.log('button test', this.searchResults)
    // console.log('UGH', this.searchResults[0])
    // console.log('double UGH', this.searchResults[1])
    // console.log('triple UGH', this.searchResults[2])
    return this.searchResult;
  }
}