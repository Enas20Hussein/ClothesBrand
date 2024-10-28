import { Component , OnInit } from '@angular/core';
import { Router , RouterModule, RouterOutlet } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { CustomOrderComponent } from "../custom-order/custom-order.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CustomOrderComponent, DashboardComponent,RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

UserName: any;
isLogging:boolean=false;

    constructor(private router: Router , private auth : AccounteService) {}


ngOnInit(): void {


  this.auth.GetFullName().subscribe({
    next:(res)=>{
      console.log(res);
      const apiResponse = res as { flag: boolean; message: string };
      // console.log(typeof(res));
    //  console.log(apiResponse.flag);
     this.isLogging=apiResponse.flag;
      if(apiResponse.flag){
        this.UserName=apiResponse.message;
      }

    },
    error:(err)=>{
      console.log(err);
      this.isLogging=false;

    }
  });
}



    logout() {
      // Implement your logout logic here (e.g., clearing tokens, redirecting to login)
      this.auth.logout();
      // console.log('User logged out');

    }

}
