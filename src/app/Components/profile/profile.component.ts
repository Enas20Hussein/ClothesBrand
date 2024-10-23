import { Component } from '@angular/core';
import { Router , RouterModule } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { CustomOrderComponent } from "../custom-order/custom-order.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CustomOrderComponent, DashboardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


    constructor(private router: Router , private auth : AccounteService) {}



    logout() {
      // Implement your logout logic here (e.g., clearing tokens, redirecting to login)
      this.auth.logout();
      console.log('User logged out');

    }

}
