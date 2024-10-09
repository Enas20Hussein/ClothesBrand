import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { CourseCardComponent } from '../courseCard/course-card/course-card.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CourseCardComponent
  ],
  providers:[CourseService],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  // cors={id:0, title:"", description:"", price:0,duration:""};
  data:any;
  constructor(private myservices:CourseService) {
  }
  ngOnInit(): void {
    this.myservices.getAll().subscribe({
      next:(val)=>this.data=val,//console.log(val),
      error:(er)=>console.log(er)
      
    })

    console.log(this.data)
    console.log(this.data)

  }

}
