import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../interfaces/UserRegistraton';
import { environment } from 'src/environments/environment.development';
import { catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  baseUrl : string = environment.apiUrl
  constructor(private http : HttpClient,
              private router: Router
  ) { }

  userRegistration(payload : UserRegistration){
    return this.http.post<any>(`${this.baseUrl}Authentication/registration`,payload).pipe(
      map(user =>{
        if(user.token === 1){
        }
        return user;
      })
    );
  }

  userLogin(payload : any){
   return this.http.post<any>(`${this.baseUrl}Authentication/logIn`,payload).pipe(
      map(response=>{
        if(response.token === 1){
          this.setCurrentUser(response)
        }
        return response;
      }),
      catchError(error => {
        return throwError(()=>error);
      })
    );
  }

  setCurrentUser(user: any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['Login'])
  }
}
