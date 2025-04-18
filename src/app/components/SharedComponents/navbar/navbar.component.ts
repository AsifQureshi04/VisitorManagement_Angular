import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userId: string = '';

  constructor(private userAuthentication: UserAuthenticationService) {}

  ngOnInit(){
    this.getUser();
  }

  getUser() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.userId = user?.data.id || 'Guest';
  }

  logout(){
    this.userAuthentication.logOut();
  }
}
