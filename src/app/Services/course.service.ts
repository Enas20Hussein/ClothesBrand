import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
endpointUrl="https://localhost:7108/api/Course"
  constructor(private http:HttpClient) { }
  
  getAll(){
    console.log(this.http.get(this.endpointUrl))

    return this.http.get(this.endpointUrl);
  }
}
