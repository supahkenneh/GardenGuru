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
    const getUrl = this.url + `user/${id}/stand`;
    return this.http.get(getUrl).toPromise();
  }

  getUserProfile(id) {
    const getUrl = this.url + `user/${id}`;
    return this.http.get(getUrl).toPromise();
  }

  getCrop(id) {
    const getUrl = this.url + `crops/${id}`;
    return this.http.get(getUrl).toPromise();
  }

  addCrop(data) {
    const postUrl = this.url + 'crops';
    return this.http.post(postUrl, data).toPromise();
  }

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

  deleteCrop(id) {
    const delUrl = this.url + `crops/${id}`;
    return this.http.delete(delUrl).toPromise();
  }
  getPlants() {
    const plantsUrl = this.url + 'garden/plants';
    return this.http.get(plantsUrl).toPromise();
  }

<<<<<<< HEAD
  editUser(data){

    const userUrl = this.url + 'user/addStand';
    return this.http.put(userUrl, data).toPromise()
=======
  updateWateringDays(data) {
    const waterUrl = this.url + 'garden/water'
    return this.http.put(waterUrl, data).toPromise();
>>>>>>> develop
  }
}
