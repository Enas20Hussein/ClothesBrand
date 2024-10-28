import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccounteService } from '../../Services/Account.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  errorMessage: string = '';
  loading: boolean = false;
  url:string="ChangePassword";
  resetObj:{email:string,password:string,newPassword:string}={
    email:"",
    password:"",
    newPassword:""
  };
  //{userId:string,Token:string,password:string}={userId="dsf",Token:"dfsd",password:"dfsdf"};
  constructor(private accountService: AccounteService,private router: Router) {


  }

  ResetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),  
    password: new FormControl('', Validators.required),
    newpassword: new FormControl( '',Validators.required ),  
    confirmPassword: new FormControl('', Validators.required)
  });


 

  Onsubmit() {
      console.log(this.ResetPassword.controls["newpassword"].value)
 
    if (this.ResetPassword.invalid) {
    
      this.errorMessage = "Please fill in all required fields correctly.";
      return;
    }
   
   
  
    if(this.ResetPassword.controls["newpassword"].value != this.ResetPassword.controls["confirmPassword"].value){
  
      this.errorMessage = "'Passwords do not match!'";
      return;
    }
    
    this.loading = true;
    
    this.resetObj["email"]=this.ResetPassword.controls["email"].value|| '';
    this.resetObj["password"]=this.ResetPassword.controls["password"].value|| '';

    this.resetObj["newPassword"]=this.ResetPassword.controls["newpassword"].value|| '';


   // console.log(this.resetObj); 
     console.log(this.url); 
    this.accountService.ChangePassword(this.url,this.resetObj).subscribe({
      next: (x) => {
        console.log(x);
        this.loading = false;  // Hide loading indicator
        this.router.navigate(['/Login']); // Redirect after successful login
      },
      error: (error) => {
        this.loading = false;  // Hide loading indicator
        console.log(error);
        this.errorMessage = error+"Login failed. Please check your credentials.";
      }
    });
  }
}
