import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccounteService } from '../../../../Services/Account.service';
import { CourseService } from '../../../../Services/course.service';
import { Course } from '../../../../Models/Course';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
  
})
export class CourseCardComponent implements OnInit {

  courses: any;

  constructor(private router: Router , private auth:AccounteService , private courseService: CourseService){}

  ngOnInit(): void {


    this.GetAllCourses();
  }



  GetAllCourses(): void{
  this.courseService.getAllCourses().subscribe((data: Course[]) => {
    this.courses = data;

  });
}

navigateToDetails(courseId: number): void {
  this.router.navigate(['/course', courseId]);

}
}
