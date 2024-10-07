import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../Models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccounteService {
  private apiUrl = 'https://localhost:7108/api/Account/identity/'; 
  private CurrentUserSource =new BehaviorSubject<User|null>(null);
  CurrentUser$= this.CurrentUserSource.asObservable();

  constructor(private http: HttpClient,private router:Router) {}

  register(values:any){
    return this.http.post<User>(this.apiUrl+'create',values).pipe(
      map(user=>{
        this.CurrentUserSource.next(user);
      })
    )

  }
  login(values: any){
    return this.http.post<User>(this.apiUrl+'login',values).pipe(
      map(user=>{
        this.CurrentUserSource.next(user);
        return user;
      })
    )
    
  }

  logout(){
    this.CurrentUserSource.next(null);
    this.router.navigateByUrl('register')
  }

  checkEmailExists(email:string){
    return this.http.get<boolean>(this.apiUrl+'EmailExists?email='+email)

  }
 
}
