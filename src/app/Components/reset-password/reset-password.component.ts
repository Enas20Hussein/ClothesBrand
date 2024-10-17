import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,RouterModule],  
 
templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  errorMessage: string = '';
  loading: boolean = false;
  url:string="ResetPassword";
  resetObj:{userId:string,Token:string,password:string}={
    userId:"dfksd",
    Token:"dfa",
    password:""
  };
  //{userId:string,Token:string,password:string}={userId="dsf",Token:"dfsd",password:"dfsdf"};
  constructor(private accountService: AccounteService, private router: Router,private param:ActivatedRoute) {
  
      const urlParams = new URLSearchParams(window.location.search);
      this.resetObj.userId= urlParams.get('userId')|| '';
      this.resetObj["Token"]= urlParams.get('token')|| '';


  }

  ResetPassword = new FormGroup({
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
    
    this.resetObj["password"]=this.ResetPassword.controls["newpassword"].value|| '';

   // console.log(this.resetObj); 
     console.log(this.url); 
    this.accountService.ResetPassword(this.url,this.resetObj).subscribe({
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




 