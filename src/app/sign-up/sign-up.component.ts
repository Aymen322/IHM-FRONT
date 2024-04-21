import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  errors = {
    name:null,
    email:null,
    password:null,
  }

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
   

    this.auth.register(name,email,password).subscribe((res)=>{
      // console.log(res);
       // redirect to dashboard
       this.router.navigate(['/login']);
    },
    (err)=>{
      this.errors = err.error.errors;
      // console.log(err.error.errors);
    })
  }

 
}
