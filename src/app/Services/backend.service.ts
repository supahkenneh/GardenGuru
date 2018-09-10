import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url: string = '/api/';

  constructor(private http: HttpClient) { }

  getGarden() {
    const getUrl = this.url + 'garden';
    return this.http.get(getUrl).toPromise();
  }

  getMarketplace() {
    const getUrl = this.url + 'marketplace';
    return this.http.get(getUrl).toPromise();
  }

  getStand(id) {
    const getUrl = this.url + `/user/${id}/stand`
    return this.http.get(getUrl).toPromise();
  }

  getUserProfile(id) {
    const getUrl = this.url + `/user/${id}`
    return this.http.get(getUrl).toPromise();
  }
}