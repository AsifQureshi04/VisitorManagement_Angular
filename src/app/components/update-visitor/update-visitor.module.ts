import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateVisitorRoutingModule } from './update-visitor-routing.module';
import { UpdateVisitorComponent } from './update-visitor.component';
import { NavbarModule } from "../SharedComponents/navbar/navbar.module";
import { SidebarModule } from "../SharedComponents/sidebar/sidebar.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateVisitorComponent
  ],
  imports: [
    CommonModule,
    UpdateVisitorRoutingModule,
    // NavbarModule,
    // SidebarModule,
    ReactiveFormsModule
]
})
export class UpdateVisitorModule { }
