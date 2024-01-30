import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly baseUrl = 'http://localhost:8080/contacts';

  constructor(private http: HttpClient) { }

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl);
  }

  public getContactById(id: string): Observable<Contact> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Contact>(url);
  }

  public getContactBySupplierId(id: string): Observable<Contact[]> {
    const url = `${this.baseUrl}/suppliers/${id}`;
    return this.http.get<Contact[]>(url);
  }

  public createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.baseUrl, contact);
  }

  public updateContact(id: string, updatedContact: Contact): Observable<Contact> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Contact>(url, updatedContact);
  }

  public deleteContact(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
