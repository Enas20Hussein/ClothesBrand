import { Component, HostListener, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { CommonModule } from '@angular/common';
import { CartSharedService } from '../../Services/cart-shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],

templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnChanges {
  cartnumber: number = 0;

   constructor(private _account:AccounteService , private cartSharedService: CartSharedService)  {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  isLogging:boolean=false;
  user:string="";

  isScrolled = false;
  isNavbarCollapsed = true;
  isDropdownOpen = false;

  ngOnInit(): void {

    // Subscribe to the cart number updates
   this.cartSharedService.currentCartNumber.subscribe(
    (cartnumber) => {
      this.cartnumber = cartnumber;
    }
  );

      this._account.isLoggedIn().subscribe({
        next:(res)=>{
          if(res!=false){
          this._account.GetFullName().subscribe({
            next:(res)=>{
              console.log(res);
              const apiResponse = res as { flag: boolean; message: string };
              console.log(typeof(res));
             console.log(apiResponse.flag);
             this.isLogging=apiResponse.flag;
              if(apiResponse.flag){
                this.user=apiResponse.message;
              }

            },
            error:(err)=>{
              console.log(err);
              this.isLogging=false;

            }
          });
        }
        else{
          this.isLogging=false;
        }
        },
        error:(err)=>{
          this._account.GetFullName().subscribe({
            next:(res)=>{
              console.log(res);
              const apiResponse = res as { flag: boolean; message: string };
              console.log(typeof(res));
             console.log(apiResponse.flag);
             this.isLogging=apiResponse.flag;
              if(apiResponse.flag){
                this.user=apiResponse.message;
              }

            },
            error:(err)=>{
              console.log(err);
              this.isLogging=false;

            }
          });

        }
      })

  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 200;
  }

  toggleDropdown(isOpen: boolean) {
    this.isDropdownOpen = isOpen;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout(){
    this._account.logout();
  }


}
