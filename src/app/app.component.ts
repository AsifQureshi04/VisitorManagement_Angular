import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VisitorManagement';

  get isLoggedIn(): boolean{
    return !!localStorage.getItem('user');
  }
}
