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

  getMarketplaceCrops() {
    const getUrl = this.url + 'marketplace/crops';
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
    const form = new FormData();
    form.append('garden_description', data.garden_description);
    form.append('watering', data.watering);
    form.append('month', data.month);
    form.append('day', data.day);
    form.append('year', data.year);
    form.append('plant', data.plant);
    data.photo.map(photo => {
      form.append('photo', photo);
    });

    const postUrl = this.url + 'crops';
    return this.http.post(postUrl, form).toPromise();
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

  editUser(data) {
    const userUrl = this.url + 'user/addStand';
    return this.http.put(userUrl, data).toPromise();
  }

  updateWateringDays(data) {
    const waterUrl = this.url + 'garden/water';
    return this.http.put(waterUrl, data).toPromise();
  }

  moveToStand(id, data) {
    const form = new FormData();
    form.append('check', data.check);
    form.append('description', data.description);
    form.append('details', data.details);
    form.append('inventory', data.inventory);
    form.append('price', data.price);
    if (data.selectedForStand) {
      data.selectedForStand.map(photo => {
        form.append('links', photo);
      })
    }
    if (data.uploadForStand) {
      data.uploadForStand.map(photo => {
        form.append('photo', photo);
      })
    }
    const moveUrl = this.url + `crops/${id}/move`;
    return this.http.put(moveUrl, form).toPromise();
  }

  editGardenCrop(data) {
    const form = new FormData();
    form.append('garden_description', data.garden_description);
    form.append('id', data.id);
    form.append('newWaterDate', data.newWaterDate);
    form.append('watering_interval', data.watering_interval);
    if (data.photos) {
      data.photos.map(photo => {
        form.append('photo', photo);
      });
    }
    if (data.photosToDelete) {
      data.photosToDelete.map(photo => {
        form.append('delete', photo);
      });
    }
    const editUrl = this.url + `garden/crop/${data.id}`;
    return this.http.put(editUrl, form).toPromise();
  }

  editStandCrop(data) {
    const form = new FormData();
    form.append('description', data.description);
    form.append('id', data.id);
    form.append('details', data.details);
    form.append('inventory', data.inventory);
    form.append('price', data.price);
    if (data.photos) {
      data.photos.map(photo => {
        form.append('photo', photo);
      });
    }
    if (data.photosToDelete) {
      data.photosToDelete.map(photo => {
        form.append('delete', photo);
      });
    }
    const editUrl = this.url + `crops/${data.id}`;
    return this.http.put(editUrl, form).toPromise();
  }

  postDirectlyToStand(data) {
    const form = new FormData();
    form.append('description', data.description);
    form.append('details', data.details);
    form.append('inventory', data.inventory);
    form.append('price', data.price);
    form.append('plant', data.plant);
    if (data.photos) {
      data.photos.map(photo => {
        form.append('photo', photo);
      })
    }

    const postUrl = this.url + 'crops/stand'
    return this.http.post(postUrl, form).toPromise();
  }
}
