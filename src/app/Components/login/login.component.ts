import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(private accountService: AccounteService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),  
    password: new FormControl('', Validators.required)
  });

  ngOnInit() {}

  Onsubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Please fill in all required fields correctly.";
      return;
    }

    this.loading = true;  // Show loading indicator

    this.accountService.login(this.loginForm.value).subscribe({
      next: (user) => {
        console.log(user);
        this.loading = false;  // Hide loading indicator
        this.router.navigate(['/Home']); // Redirect after successful login
      },
      error: (error) => {
        this.loading = false;  // Hide loading indicator
        console.log(error);
        this.errorMessage = "Login failed. Please check your credentials.";
      }
    });
  }
}
