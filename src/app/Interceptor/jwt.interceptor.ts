import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString!);

    if(user){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${user.jwtToken}`
        }
      })
    }
    return next.handle(request);
  }
}
