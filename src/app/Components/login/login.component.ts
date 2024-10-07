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

  constructor(private accountService: AccounteService, private router: Router) {}

  // Define the login form using FormGroup
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),  
    password: new FormControl('', Validators.required)
  });

  ngOnInit() { }  
  Onsubmit(){
    
    this.accountService.login(this.loginForm.value).subscribe({
      next:user=>console.log(user),
      error:error=>console.log(error)
      
    })
      
  }
  
  
}
