import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { NavbarModule } from "../SharedComponents/navbar/navbar.module";
import { SidebarModule } from "../SharedComponents/sidebar/sidebar.module";
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    // NavbarModule,
    // SidebarModule,
    ReactiveFormsModule, 
    // ToastrModule,
    // BrowserAnimationsModule,
]
})
export class ChangePasswordModule { }
