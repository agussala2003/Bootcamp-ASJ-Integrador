import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/products';
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  public getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/active`);
  }

  public getDeletedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/deleted`);
  }

  public getProductsBySupplierId(supplierId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/supplier/${supplierId}`);
  }

  public getProductsByPriceAsc(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/priceAsc`);
  }

  public getProductsByPriceDesc(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/priceDesc`);
  }

  public getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/category/${categoryId}`
    );
  }

  public postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl,product);
  }

  public putProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`,product);
  }

  public deleteProduct(id: string) :Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }

  public patchProduct(id: string) :Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}/undelete`,true);
  }

  getUserState(): string | null {
    const valor: string | null = JSON.parse(
      localStorage.getItem('inicio') || 'null'
    );
    return valor !== null ? valor : null;
  }
}
