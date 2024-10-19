import { Component, HostListener, Input, input, OnInit } from '@angular/core';
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
export class HeaderComponent  {
  // cartCount: number = 0;
  cartnumber: number = 0;

constructor(private cartSharedService: CartSharedService) {}

   ngOnInit(): void {
   // Subscribe to the cart number updates
   this.cartSharedService.currentCartNumber.subscribe(
    (cartnumber) => {
      this.cartnumber = cartnumber;
    }
  );
   }


  isScrolled = false;
  isNavbarCollapsed = true;
  isDropdownOpen = false;

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
}
