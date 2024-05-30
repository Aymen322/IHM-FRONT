import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HotelComponent } from './hotel/hotel.component';
import { TopDestinationsComponent } from './top-destinations/top-destinations.component';
import { TopSearchComponent } from './top-search/top-search.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { LoginComponent } from './login/login.component';
import { AdminClient1Component } from './admin-client1/admin-client1.component';
import { AdminHotel1Component } from './admin-hotel1/admin-hotel1.component';
import { AdminDashboard1Component } from './admin-dashboard1/admin-dashboard1.component';

const routes: Routes = [
 
  {
    path:'',
    pathMatch:'full',
    component:AccueilComponent
  },
  {
    path:'about',
    pathMatch:'full',
    component:AboutComponent,
   
  },

  {
    path:'contact',
    pathMatch:'full',
    component:ContactComponent
  },
  {
    path:'hotel',
    pathMatch:'full',
    component:HotelComponent
  },
  {
    path:'topdestinations/:regionId',
    component:TopDestinationsComponent,
   
  },
  { path: 'topsearch', component: TopSearchComponent }, 
  {
    path: 'hoteldetail/:id', 
    pathMatch: 'full',
    component: HotelDetailComponent
  },
  {
    path:'admin-clients',
    pathMatch: 'full',
    component:AdminClient1Component,
   
  },
  {
    path:'admin-reservation',
    pathMatch: 'full',
    component:AdminReservationComponent,
    
  },
  {
    path:'admin-hotels',
    pathMatch: 'full',
    component:AdminHotel1Component
  },
  {
    path:'admin-regions',
    pathMatch: 'full',
    component:AdminRegionComponent
  },
 
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'admin-dashboard',
    pathMatch: 'full',
    component: AdminDashboard1Component
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
