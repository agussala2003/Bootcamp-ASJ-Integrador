import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../models/Province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private readonly baseUrl = 'http://localhost:8080/provinces';
  constructor(private http: HttpClient) { }
  
  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.baseUrl);
  }

  getProvincesByCountryId (id:string): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.baseUrl}/by-country/${id}`);
  }
}
