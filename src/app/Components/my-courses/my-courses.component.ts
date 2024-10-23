import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Course } from '../../Models/Course';
import { AccounteService } from '../../Services/Account.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit{

  userId : string | null = null;
  courses: Course[] = [];
  constructor(private courseService : CourseService , private auth:AccounteService){}

  ngOnInit(): void {


    this.userId = this.auth.getUserId();

this.fetchCoursesForUser(); 


}

  fetchCoursesForUser(): void {
    this.courseService.getCoursesForUser(this.userId).subscribe({
      
      next: (data) =>{
        this.courses = data;

        console.log("courses fetched successfully" , data);
      } , 

      error:(err) => {

        console.log("error fetching user courses" , err)
      }
    });
  }

}
