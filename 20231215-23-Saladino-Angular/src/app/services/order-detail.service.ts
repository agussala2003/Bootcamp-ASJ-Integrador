import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetail } from '../models/OrderDetail';
import { Observable } from 'rxjs';
import { TopProducts } from '../models/TopProducts';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  constructor(private http: HttpClient) { }
  private readonly baseUrl = 'http://localhost:8080/order-details';

  public getOrderDetails(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(this.baseUrl);
  }

  public getOrderDetailById(id: string): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.baseUrl}/${id}`);
  }

  public getOrderDetailsByOrderId(orderId: string): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${this.baseUrl}/order/${orderId}`);
  }

  public getTop3Products(): Observable<TopProducts[]> {
    return this.http.get<TopProducts[]>(`${this.baseUrl}/top-products`);
  }

  public createOrderDetail(orderDetail: OrderDetail[]): Observable<OrderDetail[]> {
    return this.http.post<OrderDetail[]>(this.baseUrl, orderDetail);
  }

  public updateOrderDetail(orderDetail: OrderDetail[]): Observable<OrderDetail[]> {
    return this.http.put<OrderDetail[]>(`${this.baseUrl}/${orderDetail[0].order.id}`, orderDetail);
  }

  public deleteOrderDetail(id: string): Observable<OrderDetail> {
    return this.http.delete<OrderDetail>(`${this.baseUrl}/${id}`);
  }
}
