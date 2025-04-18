import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchVisitorBeetwenDatesComponent } from './search-visitor-beetwen-dates.component';

const routes: Routes = [{ path: '', component: SearchVisitorBeetwenDatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchVisitorBeetwenDatesRoutingModule { }
