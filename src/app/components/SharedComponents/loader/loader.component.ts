import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loading$ = this.loaderService.loader$;
  showRetry:boolean = false;

  constructor(private loaderService: LoaderService) {
    setTimeout(()=>{
      if(this.loaderService.isLoading()){
        this.showRetry = true;
      }
    },5000)
  }

  retry(){
    this.showRetry = false;
    this.loaderService.retryRequest();
  }
} 
