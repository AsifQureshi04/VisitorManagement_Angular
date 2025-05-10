import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotifyVisitorService {
    baseUrl : string = environment.apiUrl

    constructor(private http : HttpClient,
                private router: Router
    ) { }

  rejectVisitorRequestService(payload:any){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/UpdateVisitorRequestStatus`,payload).pipe(
      map(response =>{
        if(response.token === 1 && response.statusCode === '200'){
           
        }
        return response;
      }),
      catchError(error=>{
        return throwError(()=>error);
      })
    )
  }
  
  checkIfVisitorExists(payload: any) {
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/CheckIfVisitorExistsByEmail`,payload).pipe(
      map(response =>{
        if(response.token === 1 && response.statusCode === '200'){
           
        }
        return response;
      }),
      catchError(error=>{
        return throwError(()=>error);
      })
    )
  }
  
}
