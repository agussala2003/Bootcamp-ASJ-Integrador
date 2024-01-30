import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IvaCondition } from '../models/IvaCondition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IvaConditionService {
  private readonly baseUrl = 'http://localhost:8080/iva-conditions';
  constructor(private http: HttpClient) { }

  getIvaConditions(): Observable<IvaCondition[]> {
    return this.http.get<IvaCondition[]>(this.baseUrl);
  }
}
