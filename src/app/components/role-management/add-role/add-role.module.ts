import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoleRoutingModule } from './add-role-routing.module';
import { AddRoleComponent } from './add-role.component';
import { NavbarModule } from "../../SharedComponents/navbar/navbar.module";
import { SidebarModule } from "../../SharedComponents/sidebar/sidebar.module";


@NgModule({
  declarations: [
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    AddRoleRoutingModule,
    // NavbarModule,
    // SidebarModule
]
})
export class AddRoleModule { }
