import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  selectedItem: string = '';
  roleDropdownOpen: boolean = false;
  sidebarShow: boolean = true;
  roleDropdown: boolean = false;

  menu = [
    { name: 'Dashboard', icon: 'bi-house-door', route: '/Dashboard' },
    { name: 'Add Visitor', icon: 'bi-person-plus', route: '/AddVisitor' },
    { name: 'Manage Visitors', icon: 'bi-people', route: '/ManageVisitor' },
    { name: 'Visitor Search', icon: 'bi-search', route: '/SearchVisitor' },
    { name: 'Visitor B/W Dates', icon: 'bi-calendar-check', route: '/SearchVisitorBeetwenDates' },
    {
      name: 'Manage Roles',
      icon: 'bi-person-badge',
      route: '/RoleManagement',
      hasDropdown: true,
      children: [
        { name: 'Add Role', icon: 'bi-plus-square', route: '/RoleManagement/AddRole' },
        { name: 'Update Role', icon: 'bi-pencil-square', route: '/RoleManagement/UpdateRole' }
      ]
    },
    { name: 'Change Password', icon: 'bi-key', route: '/ChangePassword' }
  ];
  


  constructor(private router : Router) {
    
  }


  redirectTo(route: string) {
    console.log(route);
    this.router.navigate([route]);
  }


  toggleRoleDropdown(){
    this.roleDropdown = !this.roleDropdown;
  }

  toggleSidebar() {
    console.log('toggle side bar');
    if(this.roleDropdown)
      this.roleDropdown = !this.roleDropdown;
    this.sidebarShow = !this.sidebarShow;
   

  }
  

}
