import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${id}`, userData)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
