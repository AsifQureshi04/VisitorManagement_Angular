import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from './components/SharedComponents/sidebar/sidebar.module';
import { NavbarModule } from './components/SharedComponents/navbar/navbar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TimeFormatPipe } from './CustomPipes/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-custom',
      timeOut:2000,
      closeButton:true,
      maxOpened:1,
      preventDuplicates:true,
      enableHtml:true
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
