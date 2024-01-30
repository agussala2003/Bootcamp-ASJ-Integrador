import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Industry } from '../models/Industry';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {
  constructor(public http:HttpClient) {}
  private readonly baseUrl = 'http://localhost:8080/industries'

  public getIndustries(): Observable<Industry[]> {
    return this.http.get<Industry[]>(this.baseUrl);
  }

  public getIndustryById(id: string): Observable<Industry> {
    return this.http.get<Industry>(this.baseUrl + '/' + id);
  }
  
  public postIndustry(industry:Industry): Observable<Industry> {
    return this.http.post<Industry>(this.baseUrl, industry);
  }
  
  public deleteIndustry(id:string): Observable<Industry> {
    return this.http.delete<Industry>(this.baseUrl + '/' + id);
  }
 
  public getUserState(): string | null {
    const valor: string | null = JSON.parse(
      localStorage.getItem('inicio') || 'null'
    );
    return valor !== null ? valor : null;
  }
}
