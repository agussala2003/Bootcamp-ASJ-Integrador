import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly baseUrl = 'http://localhost:8080/locations';
  constructor(private http: HttpClient) { }

  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseUrl);
  }

  public createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.baseUrl,location);
  }

  public updateLocation(id: string,location: Location): Observable<Location> {
    return this.http.put<Location>(this.baseUrl + '/' + id,location);
  }
}
