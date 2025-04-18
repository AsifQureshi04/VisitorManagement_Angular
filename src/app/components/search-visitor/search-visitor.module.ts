import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchVisitorRoutingModule } from './search-visitor-routing.module';
import { SearchVisitorComponent } from './search-visitor.component';
import { NavbarModule } from "../SharedComponents/navbar/navbar.module";
import { SidebarModule } from "../SharedComponents/sidebar/sidebar.module";
import { SharedTableComponent } from '../SharedComponents/shared-table/shared-table.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchVisitorComponent
  ],
  imports: [
    CommonModule,
    SearchVisitorRoutingModule,
    // NavbarModule,
    // SidebarModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class SearchVisitorModule { }
