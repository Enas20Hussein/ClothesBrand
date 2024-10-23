import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccounteService } from '../Services/Account.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

 let acc= inject(AccounteService);
 let rt= inject(Router);
//  isLoggedIn$: Observable<boolean>;
// if(acc.isLoggedIn()){
//   console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
//   return true;
// }
// else{
//   rt.navigateByUrl("/Login");
//   return false;
// }

// this.isLoggedIn$ = this.acc.;
 acc.isLoggedIn().subscribe({
  next:(user)=>{
    if(user==false){
      rt.navigateByUrl("/Login");
      return false;
    }
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      console.log(user)
      return true;
  },
  error:()=>{
    console.log("ssssssssssssssssssssssssssssss");
    rt.navigateByUrl("/Login");
return false;
  }
 })
  return true;
};
