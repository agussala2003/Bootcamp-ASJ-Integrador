import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/Supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly baseUrl = 'http://localhost:8080/suppliers';

  constructor(private http: HttpClient) {}

  public getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.baseUrl);
  }

  public getSupplierById(id: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/${id}`);
  }

  public getActiveSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.baseUrl}/active`);
  }

  public getDeletedSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.baseUrl}/deleted`);
  }

  public getSuppliersByBusinessNameAsc(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.baseUrl}/businessNameAsc`);
  }

  public getSuppliersByBusinessNameDesc(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.baseUrl}/businessNameDesc`);
  }

  public postSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl, supplier);
  }

  public putSupplier(id: string, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/${id}`, supplier);
  }

  public patchSupplier(id: string): Observable<Supplier> {
    return this.http.patch<Supplier>(`${this.baseUrl}/${id}/undelete`, true);
  }

  public deleteSupplier(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
