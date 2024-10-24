import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../../Services/course.service';
import { Course } from '../../../../Models/Course'; // Adjust the import path as necessary
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateEnrollmentDto } from '../../../../Models/CreateEnrollmentDto';
import { AccounteService } from '../../../../Services/Account.service';
import { AuthInterceptor } from '../../../../Models/AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@Component({
  selector: 'app-course-details',
  standalone: true,
  imports:[ReactiveFormsModule ,RouterModule, CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Provide the interceptor here
  ]
})
export class CourseDetailsComponent implements OnInit {
  course: Course | undefined;

   courseId: number = 0;

   userId : string | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router:Router,
    private Auth:AccounteService
  ) {}

  ngOnInit(): void {

    this.userId = this.Auth.getUserId();
     this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourseDetails(this.courseId);
  }

  loadCourseDetails(courseId: number): void {
    this.courseService.getCourse(courseId).subscribe((data: Course) => {
      this.course = data;
    });
  }


  enrollInCourse() {
    const enrollmentData: CreateEnrollmentDto = {
      // Provide the necessary data for the enrollment
      courseId: this.courseId,  // Replace with dynamic course ID
      userId: this.userId,    // Replace with the actual user ID
    };

    // Call the service method
    this.courseService.createEnrollment(enrollmentData).subscribe({
      next: () => {
        // Handle success response (e.g., redirect to another page or show a success message)
        console.log('Enrollment successful');
        this.router.navigate(['/enrollment-success' , this.courseId]); // Navigate to success page (optional)
      },
      error: (err) => {
        if (err.status === 400 || err.error === 'UserAlreadyEnrolled') {
          this.router.navigate(['/already-enrolled'], {
            state: {
              courseTitle: this.course?.title,
              courseDuration: this.course?.duration
            }
          });
        }
        else if (err.status === 401) {
          this.router.navigate(['/Login']); // Navigate to login on 401 error
        }

        else {
          console.error('Enrollment error', err);
        }
      }
    });
  }
}
