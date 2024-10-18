import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccounteService } from '../../Services/Account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  
  loading: boolean = false;
  errorMessage: string = '';
  role:string='user'
  registerForm: any;  
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(private accountService: AccounteService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize registerForm in ngOnInit after FormBuilder is initialized
    this.registerForm = this.fb.group({
      name: ['', Validators.required,MinLengthValidator],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role:['user']

    });
  }

  // Method to check if password and confirm password match
  get passwordMismatch(): boolean {
    return this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value;
  }

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next:user=>console.log(user),
      error:error=>console.log(error),
      
    })
    this.router.navigate(['/Login']) 


  }
}
