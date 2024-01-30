import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(private http: HttpClient) { }
  private readonly baseUrl = 'http://localhost:8080/status';

  public getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.baseUrl);
  }
}
