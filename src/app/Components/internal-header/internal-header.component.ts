import { Component, OnInit , HostListener } from '@angular/core';
import { AccounteService } from '../../Services/Account.service';
import { CartSharedService } from '../../Services/cart-shared.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-internal-header',
  standalone: true,
  imports: [RouterModule , CommonModule],
  templateUrl: './internal-header.component.html',
  styleUrl: './internal-header.component.css'
})
export class InternalHeaderComponent implements OnInit{

  cartnumber: number = 0;

constructor (private auth:AccounteService , private cartSharedService : CartSharedService){}


ngOnInit(): void {

  this.cartSharedService.currentCartNumber.subscribe(
    (cartnumber) => {
      this.cartnumber = cartnumber;
    }
  );


  this.logout();

}

logout()
{
  this.auth.logout();

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
