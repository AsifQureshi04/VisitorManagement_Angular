import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitorManagementService } from 'src/app/services/visitor-management.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedItem: string = '';
  roleDropdownOpen: boolean = false;
  sidebarShow: boolean = false;
  roleDropdown: boolean = false;
  menuItem: any;
  selectedRoute: string = '';


  constructor(private router : Router,
              private visitorService : VisitorManagementService,
  ) {}


  ngOnInit(): void {
    this.getSideBarMenuItems();
  }

  redirectTo(route: string) {
    console.log(route);
    this.selectedRoute = route;
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

  getSideBarMenuItems(){
    var userString = localStorage.getItem('user');
    var user = JSON.parse(userString!)
    const RoleName = user.data.userRole
    console.log('role id ',RoleName)
    const payload = {
      "roleName": RoleName
    }

    this.visitorService.getSidebarMenu(payload).subscribe({
      next:(response) =>{
        if(response.token === 1 && response.statusCode === '200'){
          this.menuItem = response.data;
          console.log(this.menuItem)
        }
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  

}
