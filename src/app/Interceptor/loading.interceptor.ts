import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, identity, Observable, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from '../components/SharedComponents/loader/loader.component';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private readonly REQUES_TIMEOUT = 5000;

  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      timeout(this.REQUES_TIMEOUT),
      catchError((error:HttpErrorResponse)=>{
        this.loaderService.hide();
        return throwError(()=> error);
      }),
      finalize(() => this.loaderService.hide())
    );
  }
}