import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageVisitorRoutingModule } from './manage-visitor-routing.module';
import { ManageVisitorComponent } from './manage-visitor.component';
import { NavbarModule } from "../SharedComponents/navbar/navbar.module";
import { SidebarModule } from "../SharedComponents/sidebar/sidebar.module";
import { SharedTableComponent } from '../SharedComponents/shared-table/shared-table.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ConfirmationDialogBoxComponent } from './confirmation-dialog-box/confirmation-dialog-box.component';


@NgModule({
  declarations: [
    ManageVisitorComponent,
    ConfirmationDialogBoxComponent,

  ],
  imports: [
    CommonModule,
    ManageVisitorRoutingModule,
    // NavbarModule,
    // SidebarModule,
    SharedModuleModule
  ],
})
export class ManageVisitorModule { }
