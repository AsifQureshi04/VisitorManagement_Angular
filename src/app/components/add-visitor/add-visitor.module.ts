import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddVisitorRoutingModule } from './add-visitor-routing.module';
import { AddVisitorComponent } from './add-visitor.component';
import { NavbarModule } from "../SharedComponents/navbar/navbar.module";
import { SidebarModule } from "../SharedComponents/sidebar/sidebar.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddVisitorComponent
  ],
  imports: [
    CommonModule,
    AddVisitorRoutingModule,
    // NavbarModule,
    // SidebarModule,
    ReactiveFormsModule
]
})
export class AddVisitorModule { }
