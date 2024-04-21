import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return this.auth.status().pipe(take(1),map((loggedIn:boolean)=>{
     if(loggedIn){
       return true;
     }else{
      return this.router.createUrlTree(['/login']);
     }
   }));
  }
}
