import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceReg{
  constructor(
    private backend: BackendService,
    private session: SessionService
  ) { }

  register(data) {
    return this.backend.register(data);
  }

  login(data) {
    return this.backend.login(data)
      .then(user => {
        return this.session.setSession(user);
      });
  }

  oauthLogin(userData){
    console.log('made it to auth service')
    return this.backend.oauthLogin()
    .then(user=>{
      console.log('sending user to session')
      console.log(user);
      return this.session.setSession(user)
    })
  }

  logout() {
    return this.backend.logout().then(response => {
      return this.session.clearSession();
    });
  }
}
