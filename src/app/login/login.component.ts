import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/UserServices';
import { User } from '../models/User';
import { AuthService } from '../services/AuthService';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

    // console.log(email, password);
    this.auth.login(email, password).subscribe((res:any)=>{
      // console.log(res);
      localStorage.setItem('user', JSON.stringify(res))

      
      this.router.navigate(['']);
    },
    err=>{
      console.log(err);
    })

  }

  
}
