import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) { }
  private readonly baseUrl = 'http://localhost:8080/addresses';

  public getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.baseUrl);
  }

  public getAddressById(id: string): Observable<Address> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Address>(url);
  }

  public getAddressBySupplierId(id:string): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/suppliers/${id}`);
  }

  public postAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.baseUrl, address);
  }

  public putAddress(id: string, updatedAddress: Address): Observable<Address> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Address>(url, updatedAddress);
  }

  public deleteAddress(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
