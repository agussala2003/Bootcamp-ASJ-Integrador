import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { TopSuppliers } from '../models/TopSuppliers';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = 'http://localhost:8080/orders'
  constructor(private http: HttpClient) {}

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }
  
  public getActiveOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/active`);
  }

  public getDeletedOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/deleted`);
  }

  public getOrderById(id:string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  public getOrderByStatus(status: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/status/${status}`);
  }

  public getTop3Suppliers(): Observable<TopSuppliers[]> {
    return this.http.get<TopSuppliers[]>(`${this.baseUrl}/top-suppliers`);
  }

  public postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  public deleteOrder(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.baseUrl}/${id}`);
  }

  public putOrder(id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${id}`, order);
  }

  public undeleteOrder(id: string): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}/undelete`, true);
  }
}
