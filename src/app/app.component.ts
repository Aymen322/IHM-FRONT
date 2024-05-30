import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel';

  user!:any
  constructor(private auth:AuthService , private router:Router) {
    this.auth.getUserClaims().then((u)=>{
      this.user=u;
      if(!!this.user)console.log(this.user.displayName);
    })
  }
LOGOUT() :void {
  this.auth.doLogout().then(()=>{
   this.router.navigate([''])
  })
}
}


