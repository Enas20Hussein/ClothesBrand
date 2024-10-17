import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  errorMessage: string = '';
  url:string='';
  origin:string='';

  constructor(private accountService: AccounteService, private router: Router,private param:ActivatedRoute) {
    

    // Combine with window.location to get the host
    this.origin = window.location.origin;
    console.log('Host:', this.origin);
    

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
    
  });

 
    

    
  

  Onsubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Please fill in all required fields correctly.";
      return;
    }

   
    this.url="ForgetPassword/?email="+this.loginForm.controls["email"].value+"&origin="+this.origin;
    console.log(this.url);
    this.accountService.ForgetPassword(this.url).subscribe({
      next: (user) => {
        console.log(user);
        
      //  this.router.navigate(['/Home']); // Redirect after successful login
      },
      error: (error) => {
        
        console.log(error);
        this.errorMessage = "Login failed. Please check your credentials.";
      }
    });
  }

}
