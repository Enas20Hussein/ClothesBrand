import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { OurServicesComponent } from "../our-services/our-services.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, OurServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  projects = [
    { img: 'Images/project1.jpg' },
    { img: 'Images/project2.jpg' },
    { img: 'Images/project3.jpg' },
  ];

  private slideInterval: any;

  // OnInit lifecycle hook to start the auto slider
  ngOnInit(): void {
    this.startAutoSlider();
  }

  // OnDestroy lifecycle hook to clear the interval when the component is destroyed
  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // Start the auto-slider with a 3-second interval
  startAutoSlider() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 2000); // 3000 ms = 3 seconds
  }
  currentSlide = 0;
  displayedProjects = this.projects.slice(0, 3);

  // Move to the next slide
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.projects.length;
    this.updateDisplayedProjects();
  }

  // Move to the previous slide
  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.projects.length) % this.projects.length;
    this.updateDisplayedProjects();
  }

  // Update displayed projects based on the current slide
  updateDisplayedProjects() {
    this.displayedProjects = this.projects.slice(
      this.currentSlide,
      this.currentSlide + 3
    );

    // If fewer than 3 items are left, append from the start of the array
    if (this.displayedProjects.length < 3) {
      this.displayedProjects = this.displayedProjects.concat(
        this.projects.slice(0, 3 - this.displayedProjects.length)
      );
    }
  }
}
