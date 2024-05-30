import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryHotel } from '../models/CategoryHotel';

@Injectable({
  providedIn: 'root'
})
export class CategoryHotelService {
  private baseUrl = 'http://127.0.0.1:8000/api/category_hotels';

  constructor(private http: HttpClient) { }

  getCategoryHotels(): Observable<CategoryHotel[]> {
    return this.http.get<CategoryHotel[]>(this.baseUrl);
  }

  getCategoryHotel(id: number): Observable<CategoryHotel> {
    return this.http.get<CategoryHotel>(`${this.baseUrl}/${id}`);
  }

  createCategoryHotel(categoryHotel: CategoryHotel): Observable<CategoryHotel> {
    return this.http.post<CategoryHotel>(this.baseUrl, categoryHotel);
  }

  updateCategoryHotel(id: number, categoryHotel: CategoryHotel): Observable<CategoryHotel> {
    return this.http.put<CategoryHotel>(`${this.baseUrl}/${id}`, categoryHotel);
  }

  deleteCategoryHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getCategoryHotelById(id: number): Observable<CategoryHotel> {
    return this.http.get<CategoryHotel>(`${this.baseUrl}/${id}`);
  }
  
}
