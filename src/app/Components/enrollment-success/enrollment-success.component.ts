import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , RouterModule,Router } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { CourseService } from '../../Services/course.service';
import { Course } from '../../Models/Course';
import { Enrollment } from '../../Models/Enrollment';
import { AuthInterceptor } from '../../Models/AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@Component({
  selector: 'app-enrollment-success',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './enrollment-success.component.html',
  styleUrl: './enrollment-success.component.css',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Provide the interceptor here
  ]
})
export class EnrollmentSuccessComponent implements OnInit {

enrollmentDetails?: Enrollment; // To store the enrollment details
courseDetails?: Course;
courseId: number = 0; // Assuming you get this from the route or another source
userId : string | null = null; // Assuming you get this from the route or another source



  constructor( private route:ActivatedRoute , private router:Router , private  auth: AccounteService , private CourseService: CourseService) { }

  ngOnInit(): void {

    this.userId = this.auth.getUserId();

    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.getEnrolledCourse(this.courseId, this.userId); // Call the function to get enrolled course details
    this.getCourse(this.courseId);

  }

getCourse(id:number) : void {

  this.CourseService.getCourse(id).subscribe({
    next: (data) => {
      this.courseDetails = data;
      console.log("course created details" , this.courseDetails);
    },
    error: (err) => {
      console.error("error fetching course details" , err);
    }
  })
}
  // Function to get enrolled course details
  getEnrolledCourse(courseID: number, userID: string | null): void {
    this.CourseService.getEnrollCourse(courseID, userID).subscribe({
      next: (data) => {
        this.enrollmentDetails = data; // Store the fetched enrollment details
        console.log('Enrollment details:', this.enrollmentDetails); // Log the details for debugging
      },
      error: (err) => {

        if (err.status === 401) {
          this.router.navigate(['/Login']); // Navigate to login on 401 error
        } else {
          console.error('Error fetching data', err);
        }

      }
    });
  }



}
