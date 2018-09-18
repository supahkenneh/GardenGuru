import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user: {
    id: number;
    loggedIn: boolean;
    username: string;
    first_name: string;
    last_name: string;
    bio: string;
    city: string;
    state: string;
    stand_name: string;
    rating: number;
  } = {
    id: -1,
    loggedIn: false,
    username: '',
    first_name: '',
    last_name: '',
    bio: '',
    city: '',
    state: '',
    stand_name: '',
    rating: -1
  };

  oauthUser = {
    id: -1,
    email: '',
    image: '',
    name: '',
    loggedIn: false
  };

  constructor() {
    let oauthUserString = window.localStorage.getItem('user');
    try {
      if (oauthUserString) {
        console.log('oauthuserstin', oauthUserString)
        this.oauthUser = JSON.parse(oauthUserString);
        console.log('this.oauth',this.oauthUser)
      }
    } catch (err) {
      console.log('could not parse user');
    }

    let userString = window.localStorage.getItem('user');
    try {
      if (userString) {
        this.user = JSON.parse(userString);
      } else {
        console.log('user was not found');
      }
    } catch (err) {
      console.log('could not parse user');
    }


  }

  getSession() {
    return this.user;
  }

  getOauthSession(){
    return this.oauthUser
  }

  setSession(data) {
    console.log('session', data);
    if (data.id > 10000000) {
      this.oauthUser.id = data.id;
      this.oauthUser.loggedIn = true;
      this.oauthUser.email = data.email;
      this.oauthUser.image = data.image;
      this.oauthUser.name = data.name;
      let oauthUserString = JSON.stringify(this.oauthUser);
      window.localStorage.setItem('user', oauthUserString);
    } else {
      this.user.id = data.id;
      this.user.loggedIn = true;
      this.user.username = data.username;
      this.user.first_name = data.first_name;
      this.user.last_name = data.last_name;
      this.user.rating = data.rating;
      this.user.bio = data.bio;
      this.user.city = data.city;
      this.user.state = data.state;
      this.user.stand_name = data.stand_name;
      let userString = JSON.stringify(this.user);
      window.localStorage.setItem('user', userString);
    }
  }

  clearSession() {
    this.user.loggedIn = false;
    this.user.username = '';
    this.user.first_name = '';
    this.user.last_name = '';
    this.user.rating = -1;
    this.user.bio = '';
    this.user.city = '';
    this.user.state = '';
    this.user.stand_name = '';
    this.oauthUser.email = '';
    this.oauthUser.image = '';
    this.oauthUser.name = '';
    window.localStorage.removeItem('user');
  }

  isLoggedIn() {
    if(this.user.username || this.oauthUser.email){
      return true
    }else {
      return false
    }
  }

  
}
