import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(public http:HttpClient) { }
  private readonly baseUrl = 'http://localhost:8080/categories';

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }
  
  public getCategoryById(id:string): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + '/' + id);
  }

  public postCategory(category:Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  public putCategory(category:Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + '/' + category.id, category);
  }
  
  public deleteCategory(id:string): Observable<Category> {
    return this.http.delete<Category>(this.baseUrl + '/' + id);
  }
  
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(
      localStorage.getItem('inicio') || 'null'
    );
    return valor !== null ? valor : null;
  }
}
