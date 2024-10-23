import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getFilteredProducts(category: string, minPrice: number, maxPrice: number, keyword: string): Observable<any> {
    const params = {
      CategoryName: category,
      MinPrice: minPrice,
      MaxPrice: maxPrice,
      KeyWord: keyword
    };
    return this.http.get<any>(this.apiUrl+'Product/Filtering', { params });
  }

}
