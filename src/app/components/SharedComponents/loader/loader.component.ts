import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loading$ = this.loaderService.loader$;

  constructor(private loaderService: LoaderService) {}
} 
