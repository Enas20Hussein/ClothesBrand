import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccounteService } from './Account.service';
import { Observable } from 'rxjs';
import { Course } from '../Models/Course';
import { CreateEnrollmentDto } from '../Models/CreateEnrollmentDto';
import { Enrollment } from '../Models/Enrollment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
apiUrl="https://localhost:7108/api/Course"
enrollUrl = "https://localhost:7108/api/Enroll"
  constructor(private http:HttpClient,private auth:AccounteService) { }

  getAll(){
    console.log(this.http.get(this.apiUrl))
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.get(this.apiUrl,{headers});
  }

  // Get all courses
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // Get a specific course by ID
  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // Create a new enrollment
  createEnrollment(enrollment: CreateEnrollmentDto): Observable<void> {

    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.post<void>(`${this.enrollUrl}`, enrollment, {headers});
  }

  // Delete an enrollment
  deleteEnrollment(courseID: number, userID: string): Observable<void> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.delete<void>(`${this.enrollUrl}/${courseID}/userId/${userID}`, {

      headers
    });
  }

  // Get enrolled course details
  getEnrollCourse(courseID: number, userID: string | null ): Observable<Enrollment> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.get<Enrollment>(`${this.enrollUrl}/${courseID}/userId/${userID}` ,{headers});
  }


  // Get courses for a specific user
  getCoursesForUser(userId: string | null): Observable<Course[]> {

    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.get<Course[]>(`${this.enrollUrl}/GetCoursesForUser/${userId}` , {headers});
  }


}
