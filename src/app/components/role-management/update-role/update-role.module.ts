import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoleRoutingModule } from './update-role-routing.module';
import { UpdateRoleComponent } from './update-role.component';
import { NavbarModule } from "../../SharedComponents/navbar/navbar.module";
import { SidebarModule } from "../../SharedComponents/sidebar/sidebar.module";


@NgModule({
  declarations: [
    UpdateRoleComponent
  ],
  imports: [
    CommonModule,
    UpdateRoleRoutingModule,
    // NavbarModule,
    // SidebarModule
]
})
export class UpdateRoleModule { }
