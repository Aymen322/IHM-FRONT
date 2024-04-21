import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router) { }

    // Toogle Loggedin
    toggleLogin(state: boolean): void {
        this.isLoggedIn.next(state);
    }

    // Status
    status() {
        const localData: any = localStorage.getItem('user');
        if (!localData) {
            this.isLoggedIn.next(false);
            console.log('User not logged in !!');
        } else {
            const userObj = JSON.parse(localData);
            let token_expires_at = new Date(userObj.token_expires_at);
            const current_date = new Date();
            if (token_expires_at = current_date) {
                this.isLoggedIn.next(true);
            } else {
                this.isLoggedIn.next(false);
                console.log('Token Expires!!');
            }
        }
        return this.isLoggedIn.asObservable();
    }

    // Login
    login(email: string, password: string) {
        return this.http.post('http://localhost:8000/api/login', {
            email: email,
            password: password,
        });
    }

    // User Info
    user() {
        const user: any = localStorage.getItem('user');
        const userObj = JSON.parse(user);

        const token = userObj.token;
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.get('http://localhost:8000/api/user', {
            headers: headers,
        });
    }

    // Logout
    logoutUser() {
        this.isLoggedIn.next(false);
      }
    // Register
    register(name: string, email: string, password: string) {
        const data = {
            name: name,
            email: email,
            password: password
        }
        return this.http.post('http://localhost:8000/api/register', data);
    }
}
