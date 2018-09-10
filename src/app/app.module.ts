import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { SidebarComponent } from './Sidebar/sidebar.component';
import {LoginComponent} from './Login/login.component';
import { RegisterComponent } from './Register/register.component';

//services

import { BackendService} from '../services/backend.service'
import { AuthService } from '../services/auth.service';
import {SessionService} from '../services/session.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ])
  ],
  providers: [
    BackendService,
    SessionService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
