import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AddVisitorPayload } from '../Models/AddVisitorPayload';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorManagementService {
  baseUrl : string = environment.apiUrl
  
  constructor(private http : HttpClient,
              private router: Router
  ) { }

  addVisitor(payload : AddVisitorPayload){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/AddVisitor`,payload).pipe(
      map(response =>{
        if(response.token === 1){

        }
        return response
      }),
      catchError(error =>{
        return throwError(()=> error);
      })
    )
  }

  getAllVisitors(payload:any){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/GetAllVisitors`,payload).pipe(
      map(response=>{
        if(response.token === 1 && response.statusCode === '200'){
           
        }
        return response;
      }),
      catchError(error=>{
        return throwError(()=>error);
      })
    )
  }

  getVisitorById(payload:any){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/GetVisitorById`,payload).pipe(
      map(response=>{
        if(response.token === 1 && response.statusCode === '2000'){
          
        }
        return response;
      }),
      catchError(error=>{
        return throwError(()=>error);
      })
    )
  }

  updateVisitor(payload :any){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/UpdateVisitors`,payload).pipe(
      map(response =>{
        if(response.token === 1 && response.statusCode === '200'){

        }
        return response
      }),
      catchError(error=>{
        return throwError(()=>error)
      })
    ) 
  }

  getDepartmentList(){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/GetDepartmentList`,{}).pipe(
      map(response =>{
        if(response.token === 1 && response.statusCode === '200'){

        }
        return response
      }),
      catchError(error=>{
        return throwError(()=>error)
      })
    ) 
  }

  getIdProodfList(){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/idproof-types`,{}).pipe(
      map(response =>{
        if(response.token === 1 && response.statusCode === '200'){

        }
        return response
      }),
      catchError(error=>{
        return throwError(()=>error)
      })
    ) 
  }

  deleteVisitor(payload:any){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/DeleteVisitorById`,payload).pipe(
      map(response =>{
        if(response.token === 1 && response.statusCode === '200'){

        }
        return response
      }),
      catchError(error=>{
        return throwError(()=>error)
      })
    ) 
  }

  getVisitorCount(){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/VisitorCount`,{}).pipe(
      map(response =>{
        if(response.token === 1 && response.statusCode === '200'){
            return response;
        }
      }),
      catchError(error=>{
        return throwError(()=>error)
      })
    )
  }

  getSidebarMenu(payload : any){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/GetSidebarMenuItems`,payload).pipe(
      map(response =>{
        if(response.token === 1 && response.statusCode === '200'){
            return response;
        }
      }),
      catchError(error=>{
        return throwError(()=>error)
      })
    )
  }

  generateAddVisitorFormQRCode(){
    return this.http.post<any>(`${this.baseUrl}ManageVisitors/addVisitorFormQrCode`,{}).pipe(
      map(response =>{
        if(response.token === 1 && response.statusCode === '200'){
            return response;
        }
      }),
      catchError(error=>{
        return throwError(()=>error)
      })
    )
  }
}
