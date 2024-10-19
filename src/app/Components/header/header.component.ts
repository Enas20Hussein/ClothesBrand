import { Component, HostListener, Input, input, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
  // cartCount: number = 0;

  // constructor(private cartService: CartService) {}

  // ngOnInit(): void {
  //   this.cartService.getCartCount().subscribe((count) => {
  //     this.cartCount = count; // Update cart icon number
  //   });
  // }

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
