import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchVisitorComponent } from './search-visitor.component';

const routes: Routes = [{ path: '', component: SearchVisitorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchVisitorRoutingModule { }
