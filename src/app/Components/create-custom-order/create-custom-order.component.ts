import { Component } from '@angular/core';
import { CustomOrderService } from '../../Services/custom-order.service';
import { CustomClothingOrder } from '../../Models/CustomClothingOrder';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../Models/AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@Component({
  selector: 'app-create-custom-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-custom-order.component.html',
  styleUrls: ['./create-custom-order.component.css'],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Provide the interceptor here
  ]
})
export class CreateCustomOrderComponent {

  userId: string | null = localStorage.getItem('userId');

  order: CustomClothingOrder = {
    designDescription: '',
    fabricDetails: '',
    depositAmount: 0,
    customOrderStatus: 'Pending',
    shoulderWidth: 0,
    chestCircumference: 0,
    waistCircumference: 0,
    hipCircumference: 0,
    waistLength: 0,
    armLength: 0,
    bicepSize: 0,
    customerName: '',
    phoneNumber: '',
    modelLength: 0,
    image: null,
    userId: this.userId
  };

  constructor(private customOrderService: CustomOrderService, private router: Router) {}

  // Handle image file change
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.order.image = event.target.files[0];
    }
  }

  // Submit order form
  onSubmit() {
    const formData = new FormData();
    formData.append('customerName' , this.order.customerName);
    formData.append('phoneNumber' , this.order.phoneNumber);
    formData.append('designDescription', this.order.designDescription);
    formData.append('fabricDetails', this.order.fabricDetails);
    formData.append('depositAmount', this.order.depositAmount.toString());
    formData.append('customOrderStatus', this.order.customOrderStatus);
    formData.append('shoulderWidth', this.order.shoulderWidth.toString());
    formData.append('chestCircumference', this.order.chestCircumference.toString());
    formData.append('waistCircumference', this.order.waistCircumference.toString());
    formData.append('hipCircumference', this.order.hipCircumference.toString());
    formData.append('waistLength', this.order.waistLength.toString());
    formData.append('armLength', this.order.armLength.toString());
    formData.append('bicepSize', this.order.bicepSize.toString());
    formData.append('modelLength', this.order.modelLength.toString());
    formData.append('userId', this.order.userId || '');

    if (this.order.image) {
      formData.append('image', this.order.image);
    }

    this.customOrderService.createOrder(formData).subscribe({
      next: (response) => {
        console.log('Order created successfully');
        console.log(response);

        const createdOrderId = response.id;
        this.router.navigate(['/orders',createdOrderId]);
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
