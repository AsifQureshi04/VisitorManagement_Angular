import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);
  private retrySubject = new Subject<void>();

  loader$ = this.loaderSubject.asObservable();
  retry$ = this.retrySubject.asObservable();

  private activeRequests = 0;
  private timeOutHandler: number[] = [];

  show() {
    this.activeRequests++;
    this.loaderSubject.next(true);
    const handler = window.setTimeout(()=>{
      if(this.activeRequests > 0){
        this.loaderSubject.next(false);
      }
    },5000);
    this.timeOutHandler.push(handler);
  }

  hide() {
    this.activeRequests--;
    if(this.activeRequests <= 0){
      this.clearTimeouts();
      this.activeRequests = 0;
      this.loaderSubject.next(false);
    }
  }

  isLoading(): boolean{
    return this.activeRequests > 0;
  }

  retryRequest(){
    return this.retrySubject.next();
  }

  resetTimeout(){
    this.clearTimeouts();
    if(this.activeRequests > 0){
      this.show();
    }
  }

  clearTimeouts(){
    this.timeOutHandler.forEach(handler => clearTimeout(handler))
    this.timeOutHandler = [];
  }


  // forceHide(){
  //   this.clearTimeouts();
  //   this.activeRequests = 0;
  //   this.loaderSubject.next(false);
  // }
}