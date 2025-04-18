import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVisitorComponent } from './add-visitor.component';

const routes: Routes = [{ path: '', component: AddVisitorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddVisitorRoutingModule { }
