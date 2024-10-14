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
  
  userId:string | null=null
  constructor(private http: HttpClient,private router:Router) {}
// Retrieve the user ID
getUserId(): string | null {
  return this.userId || localStorage.getItem('userId');
}
setUserId(id: string) {
  this.userId = id;
  localStorage.setItem('userId', this.userId); // Store in local storage (optional)
}

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
        localStorage.setItem('token',user.token);
        this.setUserId(user.userId);
        this.CurrentUserSource.next(user);
      
        return user;
      })
    )
    
  }

  logout(){
    localStorage.removeItem('userId'); 
    localStorage.removeItem('token');
    this.CurrentUserSource.next(null);
    this.router.navigateByUrl('register')
  }
 

  

  checkEmailExists(email:string){
    return this.http.get<boolean>(this.apiUrl+'EmailExists?email='+email)

  }
 
}
