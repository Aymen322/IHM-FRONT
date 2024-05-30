import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private AUTH: AuthService, private router:Router) {}

signin() {
  this.AUTH.doGoogleLogin().then(()=>{
    this.router.navigate(['/accueil'])
  });

}
}
