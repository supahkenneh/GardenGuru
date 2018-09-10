import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Header/header.component';
import { SidebarComponent } from './Components/Sidebar/sidebar.component';
import { FooterComponent } from './Components/Footer/footer.component';

//Pages
import { GardenComponent } from './Pages/Garden/garden.component';
import { MarketplaceComponent } from './Pages/Marketplace/marketplace.component';
import { StandComponent } from './Pages/Stand/stand.component';
import { ProfileComponent } from './Pages/Profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './Services/backend.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    GardenComponent,
    MarketplaceComponent,
    StandComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'garden', component: GardenComponent },
      { path: 'marketplace', component: MarketplaceComponent },
      { path: 'stand', component: StandComponent },
      { path: 'profile', component: ProfileComponent }
    ])
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
