import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleManagementComponent } from './role-management.component';
import { NavbarModule } from "../SharedComponents/navbar/navbar.module";
import { SidebarModule } from "../SharedComponents/sidebar/sidebar.module";


@NgModule({
  declarations: [
    RoleManagementComponent
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    // NavbarModule,
    // SidebarModule
]
})
export class RoleManagementModule { }
