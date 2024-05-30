import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';

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
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { AdminRegionComponent } from './admin-region/admin-region.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { FirebaseModule } from './firebase.module';
import { LoginComponent } from './login/login.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { AdminClient1Component } from './admin-client1/admin-client1.component';
import { ConfirmDialogComponent } from './admin-client1/confirm-dialog/confirm-dialog.component';
import { ClientformComponent } from './admin-client1/clientform/clientform.component';
import { HotelformComponent } from './admin-hotel1/hotelform/hotelform.component';
import { AdminHotel1Component } from './admin-hotel1/admin-hotel1.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ReservationFormComponent } from './admin-reservation/reservation-form/reservation-form.component';
import { RegionFormComponent } from './admin-region/region-form/region-form.component';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminDashboard1Component } from './admin-dashboard1/admin-dashboard1.component';
@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    ContactComponent,
    AboutComponent,
    HotelComponent,
    TopDestinationsComponent,
    TopSearchComponent,
    HotelDetailComponent,
    AdminHotel1Component,
    AdminRegionComponent,
    AdminReservationComponent,
    AdminClient1Component,
    ClientformComponent,
    ConfirmDialogComponent,
    HotelformComponent,
    ConfirmDialogComponent,
    AdminHotel1Component,
    RegionFormComponent,
    ReservationFormComponent,
    AdminDashboard1Component
  
   
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
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FirebaseModule,
    MatCardModule,
    MatSortModule,
    MatFormFieldModule,
    MatMenuModule,
    MatNativeDateModule,
    NgChartsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    OverlayModule,
    FlexLayoutModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
