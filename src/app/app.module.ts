import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Header/header.component';
import { SidebarComponent } from './Components/Sidebar/sidebar.component';
import { SearchComponent } from './Components/Search/search.component';
import { FooterComponent } from './Components/Footer/footer.component';
import { LoginComponent } from './Pages/Login/login.component';
import { RegisterComponent } from './Pages/Register/register.component';
import { GardenComponent } from './Pages/Garden/garden.component';
import { MarketplaceComponent } from './Pages/Marketplace/marketplace.component';
import { StandComponent } from './Pages/Stand/stand.component';
import { ProfileComponent } from './Pages/Profile/profile.component';
import { CropComponent } from './Pages/Crop/crop.component';
import { AddCropComponent } from './Pages/AddCrop/addcrop.component';
import { MessagesComponent } from './Pages/Messages/messages.component';
import { GardenCropComponent } from './Pages/GardenCrop/gardenCrop.component';
import { ConversationComponent } from './Pages/Conversation/conversation.component';

//services
import { BackendService } from './Services/backend.service';
import { AuthService } from './Services/auth.service';
import { SessionService } from './Services/session.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    FooterComponent,
    GardenComponent,
    MarketplaceComponent,
    StandComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CropComponent,
    AddCropComponent,
    MessagesComponent,
    GardenCropComponent,
    ConversationComponent
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
      { path: 'user/:id/stand', component: StandComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'crops/:id', component: CropComponent },
      { path: 'garden/addcrop', component: AddCropComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'garden/crops/:id', component: GardenCropComponent },
      { path: 'conversation/:id', component: ConversationComponent },
    ])
  ],
  providers: [BackendService, SessionService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
