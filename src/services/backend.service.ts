import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  url: string = 'http://localhost:4200/api/';

  constructor(private http: HttpClient) {}

  login(data) {
    const loginUrl = this.url + 'login';
    return this.http.post(loginUrl, data).toPromise();
  }

  register(data) {
    const registerUrl = this.url + 'register';
    return this.http.post(registerUrl, data).toPromise();
  }

  logout() {
    const logoutUrl = this.url + 'logout';
    return this.http.get(logoutUrl).toPromise();
  }
}
