import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {


  experienceCount: number = 0;
  challengesCount: number = 0;
  reviewsCount: number = 0;
  studentsCount: number = 0;

  ngOnInit(): void {
    this.startCounter('experienceCount', 15, 200);
    this.startCounter('challengesCount', 83, 200);
    this.startCounter('reviewsCount', 830, 200);
    this.startCounter('studentsCount', 100000, 200);
  }

  // Updated method with type-safe property access
  startCounter(field: 'experienceCount' | 'challengesCount' | 'reviewsCount' | 'studentsCount', target: number, duration: number) {
    const increment = target / duration;
    const interval = setInterval(() => {
      if (this[field] < target) {
        this[field] = Math.ceil(Math.min(this[field] + increment, target));
      } else {
        clearInterval(interval);
      }
    }); // Adjust the speed of the update
  }
}

