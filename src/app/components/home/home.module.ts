import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarModule } from '../SharedComponents/navbar/navbar.module';
import { SidebarModule } from '../SharedComponents/sidebar/sidebar.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // NavbarModule,
    // SidebarModule
  ]
})
export class HomeModule { }
