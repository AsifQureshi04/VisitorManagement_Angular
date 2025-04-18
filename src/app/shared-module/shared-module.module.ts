import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from '../components/SharedComponents/shared-table/shared-table.component';
import { NavbarModule } from '../components/SharedComponents/navbar/navbar.module';
import { SidebarModule } from '../components/SharedComponents/sidebar/sidebar.module';
import { TimeFormatPipe } from '../CustomPipes/time-format.pipe';



@NgModule({
  declarations: [SharedTableComponent,TimeFormatPipe],
  imports: [
    CommonModule,
  ],
  exports:[SharedTableComponent]
})
export class SharedModuleModule { }
