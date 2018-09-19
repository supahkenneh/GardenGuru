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
    if (
      event.target !== document.getElementById('search-sidebar-container') &&
      event.target.id !== 'search-sidebar' &&
      document.getElementById('search-sidebar-container').className === 'active'
    ) {
      document.getElementById('search-sidebar').classList.toggle('active');
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

  searchCrop() {
    this.resultErrors.length = 0;
    return this.backend.search(this.cropSearchData)
      .then(response => {
        if (!this.session.getSession().loggedIn) {
          if (!response) {
            if (this.cropSearchData.category === 'Marketplace') {
              this.resultErrors.push('No crops matching the description were found!');
              this.resultValid = false;
            } else if (this.cropSearchData.category === 'My Stand' || this.cropSearchData.category === 'My Garden') {
              this.resultErrors.push('Please log in to properly search through your own crops!');
              this.resultValid = false;
            } else {
              this.resultErrors.push('There was an error processing your request.');
              this.resultValid = false;
            }
          } else {
            return this.backend.results(response);
          }
        } else {
          if (!response) { //x
            if (this.cropSearchData.category === 'Marketplace') {
              this.resultErrors.push('No crops matching the description were found in your area!');
              this.resultValid = false;
            } else if (this.cropSearchData.category === 'My Stand') {
              this.resultErrors.push('No crops matching the description were found in your stand!');
              this.resultValid = false;
            } else if (this.cropSearchData.category === 'My Garden') {
              this.resultErrors.push('No crops matching the description were found in your garden!');
              this.resultValid = false;
            }
          } else {
            return this.backend.results(response);
          }
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
      // console.log(this.cropSearchData.searchInput)
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
