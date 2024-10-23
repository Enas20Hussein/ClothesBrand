import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AccounteService {
 

  private apiUrl = 'https://localhost:7108/api/Account/identity/'; 
  private refreshTokenEndpoint =this.apiUrl+"refresh-token";
  private accessToken:string|null=null;
  private tokenExpiry:number | null = null;

  private CurrentUserSource =new BehaviorSubject<User|null>(null);
  

  private loggedIn = new BehaviorSubject<boolean>(this.checkTokenValidity());
  CurrentUser$= this.CurrentUserSource.asObservable();
  
  userId:string | null=null
  constructor(private http: HttpClient,private router:Router) {}


  setAccessToken(token: string): void {
    this.accessToken = token;

    // Decode the token to get the expiration time (JWT specific)
    const decodedToken: any = jwtDecode(token);
    this.tokenExpiry = decodedToken.exp * 1000; // `exp` is in seconds, convert to milliseconds
    console.log(Date.now());
    console.log("setAccessToken");
    console.log(this.tokenExpiry);


    // Optionally store in session storage
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', this.tokenExpiry.toString());
  }


  getAccessToken(): string | null {
    return this.accessToken || localStorage.getItem('token');
  }
  getTokenExpiry(): number | null {
    return this.tokenExpiry || Number(localStorage.getItem('tokenExpiry'));
  }

  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    console.log("isTokenExpired");
    console.log(expiry)
    if (!expiry) return true; // If no expiry date, assume token is expired
    return Date.now() > expiry;
  }

  refreshToken(): Observable<any> {
    return this.http.post(this.refreshTokenEndpoint, {}, { withCredentials: true }).pipe(
      tap((response: any) => {
        console.log("enter refresh",response)

        if (response.token) {
          console.log("changed Token")
          this.setAccessToken(response.token)
          //localStorage.setItem('token',response.accessToken);
        }
      })
    );
  }
  

// Shaban@123


isLoggedIn(): Observable<boolean> {
  return this.loggedIn.asObservable();
}

private checkTokenValidity(): boolean {
  const token = this.getAccessToken();
  if (token) {
    
    return true;
  }
  return false;
}


    getAuthHeaders(): HttpHeaders 
    {
      if(this.isTokenExpired()){
        this.refreshToken().subscribe();
      }
     

    const token = this.getAccessToken();
     // Ensure the token is stored in localStorage or another secure place
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
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
    return this.http.post<User>(this.apiUrl+'login',values,{ withCredentials: true }).pipe(
      map(user=>{
       // localStorage.setItem('token',user.token);
       this.setAccessToken(user.token);
        this.setUserId(user.userId);
        this.CurrentUserSource.next(user);
        this.loggedIn.next(true);
      
        return user;
      })
    )
    
  }

  logout(){
    localStorage.removeItem('userId'); 
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.CurrentUserSource.next(null);
    this.http.get(this.apiUrl+"LogOut");
    this.router.navigateByUrl('Login');
    

  }
 

  
 ResetPassword(methodName:string,QueryUrl:any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.post(this.apiUrl+methodName,QueryUrl,{ headers })
    
 }
  checkEmailExists(email:string){
    return this.http.get<boolean>(this.apiUrl+'EmailExists?email='+email)

  }
  ForgetPassword(url:string){
    return this.http.get(this.apiUrl+url)
  }
 

  ChangePassword(methodName:string,QueryUrl:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl+methodName,QueryUrl,{ headers })
  }
  GetFullName(){
    const headers = this.getAuthHeaders();
    return this.http.get(this.apiUrl+"CurrentUserName",{headers})
  }
}
