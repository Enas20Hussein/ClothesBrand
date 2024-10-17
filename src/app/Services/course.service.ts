import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccounteService } from './Account.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
endpointUrl="https://localhost:7108/api/Course"
  constructor(private http:HttpClient,private auth:AccounteService) { }
  
  getAll(){
    console.log(this.http.get(this.endpointUrl))
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.get(this.endpointUrl,{headers});
  }
}
