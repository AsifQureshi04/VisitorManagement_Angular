import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageVisitorComponent } from './manage-visitor.component';

const routes: Routes = [{ path: '', component: ManageVisitorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageVisitorRoutingModule { }
