import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Header/header.component';
import { SidebarComponent } from './Components/Sidebar/sidebar.component';
import { FooterComponent } from './Components/Footer/footer.component';
import { LoginComponent } from './Pages/Login/login.component';
import { RegisterComponent } from './Pages/Register/register.component';
import { GardenComponent } from './Pages/Garden/garden.component';
import { MarketplaceComponent } from './Pages/Marketplace/marketplace.component';
import { StandComponent } from './Pages/Stand/stand.component';
import { ProfileComponent } from './Pages/Profile/profile.component';

//services
import { BackendService } from './Services/backend.service';
import { AuthService } from './Services/auth.service';
import { SessionService } from './Services/session.service';
import { AddCropComponent } from './Pages/AddCrop/addcrop.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    GardenComponent,
    MarketplaceComponent,
    StandComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    AddCropComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'garden', component: GardenComponent },
      { path: 'marketplace', component: MarketplaceComponent },
      { path: 'stand', component: StandComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'garden/addcrop', component: AddCropComponent },

      
    ])
  ],
  providers: [BackendService, SessionService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
