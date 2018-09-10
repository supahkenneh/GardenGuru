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
}