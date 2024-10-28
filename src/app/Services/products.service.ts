import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccounteService } from './Account.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://localhost:7108/api/'; 

  constructor(private http:HttpClient,private auth:AccounteService) { }

  getAllProducts(){
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.get(this.apiUrl+'Product',{headers})
  }
  getProductById(id: string): Observable<any> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    const url = `${this.apiUrl}product/${id}`;
    return this.http.get<any>(url,{headers});
  }


  getAllProSlider(){
    
      const headers = this.auth.getAuthHeaders(); // Get the authorization header
  
      return this.http.get(this.apiUrl+'Product',{headers})
    
  }

  getFilteredProducts(
    category: string,
    minPrice: number | null,
    maxPrice: number | null,
    keyword: string
  ): Observable<any> {
    const headers = this.auth.getAuthHeaders();
    
    // Create HttpParams to append query parameters
    let params = new HttpParams()
      .set('CategoryName', category)
      .set('KeyWord', keyword);

    if (minPrice !== null) {
      params = params.set('MinPrice', minPrice.toString());
    }
    if (maxPrice !== null) {
      params = params.set('MaxPrice', maxPrice.toString());
    }

    return this.http.get<any>(this.apiUrl + 'Product/Filtering', { headers, params });
  }
  
  getCategories(): Observable<any> {
    const headers = this.auth.getAuthHeaders();
    return this.http.get<any>(this.apiUrl+'Category', { headers });
  }
  

}
