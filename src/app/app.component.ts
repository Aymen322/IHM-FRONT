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
  loggedIn:boolean = false;
  constructor(private auth:AuthService , private router: Router) { }

  ngOnInit(): void {
    this.auth.status().subscribe((res) => {
      this.loggedIn = res;
    }, (err) => {
      console.log(err);
    })
    
  }

    logout() {
      this.auth.logoutUser();
    }
}


