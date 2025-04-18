import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateVisitorComponent } from './update-visitor.component';

const routes: Routes = [{ path: '', component: UpdateVisitorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateVisitorRoutingModule { }
