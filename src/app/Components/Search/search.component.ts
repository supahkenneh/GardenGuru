import { Component, HostListener } from '@angular/core';
import { SessionService } from '../../Services/session.service';
import { AuthServiceReg } from '../../Services/auth.service';
import { BackendService } from '../../Services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  user: object;
  category: any;
  searchInput: string = '';

  categories: string[] = ['Marketplace', 'My Stand', 'My Garden'];

  cropSearchData: {
    category: string;
    searchInput: string;
  } = {
      category: 'Marketplace',
      searchInput: ''
    }

  searchErrors: string[] = [];
  searchValid: boolean = false;

  resultErrors: string[] = [];
  resultValid: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    let searchSidebar = document.getElementById('search-sidebar');
    let searchIcon = document.getElementById('search-icon');
    let searchImage = document.getElementById('search');
    let searchForm = document.getElementById('search-form');
    let formChildren = searchForm.childNodes;
    let formChildrenList = Object.values(formChildren);

    if (
      event.target !== searchIcon &&
      searchSidebar.className === 'active' &&
      event.target !== searchSidebar &&
      event.target !== searchImage &&
      event.target !== searchForm &&
      !formChildrenList.includes(event.target)
    ) {
      searchSidebar.classList.toggle('active');
    }
  }

  constructor(
    private session: SessionService,
    private auth: AuthServiceReg,
    private backend: BackendService,
    private router: Router
  ) {
    this.user = session.getSession();
  }

  isLoggedIn() {
    return this.session.isLoggedIn();
  }

  toggleSearchSideBar() {
    document.getElementById('search-sidebar').classList.toggle('active');
  }

  // Search methods goes below here
  searchCrop() {
    this.resultErrors.length = 0;
    return this.backend.search(this.cropSearchData)
      .then(response => {
        if (!response) {
          this.resultErrors.push('Nothing matched the input!');
          this.resultValid = false;
        } else {
          return this.backend.results(response)
        }
      })
      .then(response => {
        return this.router.navigate([`search-results/${this.cropSearchData.searchInput}`])
      })
      .catch(err => {
        this.resultErrors.push('Nothing matched the input!');
        this.resultValid = false;
        console.log('Error :', err);
      })
  }

  validateSearch() {
    this.searchErrors.length = 0;
    if (this.cropSearchData.searchInput.length < 1) {
      this.searchErrors.push('This field is required!');
      this.searchValid = false;
    } else {
      this.searchValid = true;
    }
  }

  getSearchErrors() {
    return this.searchErrors.join(', ');
  }

  getResultErrors() {
    return this.resultErrors.join(', ');
  }
}