import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://localhost:7108/api/'; 

  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get(this.apiUrl+'Product')
  }
}
