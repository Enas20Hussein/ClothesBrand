import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CustomOrderService } from '../../Services/custom-order.service';
import { returnCustomClothingOrder } from '../../Models/returncustomorder';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from '../../Models/AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@Component({
  selector: 'app-custom-order-details',
  standalone: true,  // Standalone component
  imports: [CommonModule],  // Include CommonModule here
  templateUrl: './custom-order.component.html',
  styleUrls: ['./custom-order.component.css'],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Provide the interceptor here
  ]
})
export class CustomOrderComponent implements OnInit {
  orderId: number = 0;
  order: returnCustomClothingOrder | null = null;

  constructor(
    private route: ActivatedRoute,
    private customOrderService: CustomOrderService , private router : Router
  ) {}

  ngOnInit(): void {
    // Get the orderId from the route parameter
    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
    if (this.orderId) {
      this.getOrderById(this.orderId);
    }
  }

  getOrderById(orderId: number): void {
    this.customOrderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order; // Order data fetched by id
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/Login']); // Navigate to login on 401 error
        } else {
          console.error('Error fetching data', error);
        }
      }
    });
  }
}
