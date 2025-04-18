import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchVisitorBeetwenDatesRoutingModule } from './search-visitor-beetwen-dates-routing.module';
import { SearchVisitorBeetwenDatesComponent } from './search-visitor-beetwen-dates.component';
import { NavbarModule } from "../SharedComponents/navbar/navbar.module";
import { SidebarModule } from "../SharedComponents/sidebar/sidebar.module";
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from "../../shared-module/shared-module.module";


@NgModule({
  declarations: [
    SearchVisitorBeetwenDatesComponent
  ],
  imports: [
    CommonModule,
    SearchVisitorBeetwenDatesRoutingModule,
    // NavbarModule,
    // SidebarModule,
    ReactiveFormsModule,
    SharedModuleModule
]
})
export class SearchVisitorBeetwenDatesModule { }
