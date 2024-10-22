import { Component } from '@angular/core';
import {  RouterModule,Router } from '@angular/router';
import { AuthInterceptor } from '../../Models/AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP_INTERCEPTORS here
@Component({
  selector: 'app-already-enrolled',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './already-enrolled.component.html',
  styleUrl: './already-enrolled.component.css',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Provide the interceptor here
  ]
})
export class AlreadyEnrolledComponent {

  courseTitle: string = '';
  courseDuration: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as { [key: string]: any };
      this.courseTitle = state['courseTitle'];
      this.courseDuration = state['courseDuration'];
  }

}
}
