import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HotelComponent } from './hotel/hotel.component';
import { HttpClientModule } from '@angular/common/http';
import { TopDestinationsComponent } from './top-destinations/top-destinations.component';
import { TopSearchComponent } from './top-search/top-search.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AdminClientComponent } from './admin-client/admin-client.component';
import { CreateClientComponent } from './admin-client/create-client/create-client.component';
import { MatTableModule } from '@angular/material/table';
import { AdminHotelComponent } from './admin-hotel/admin-hotel.component';
import { CreateHotelComponent } from './admin-hotel/create-hotel/create-hotel.component';
import { AdminRegionComponent } from './admin-region/admin-region.component';
import { CreateRegionComponent } from './admin-region/create-region/create-region.component'

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    SignUpComponent,
    ContactComponent,
    AboutComponent,
    HotelComponent,
    TopDestinationsComponent,
    TopSearchComponent,
    HotelDetailComponent,
    AdminClientComponent,
    CreateClientComponent,
    AdminHotelComponent,
    CreateHotelComponent,
    AdminRegionComponent,
    CreateRegionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
