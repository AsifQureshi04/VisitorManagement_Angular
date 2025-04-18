import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: '', component:LoginComponent},

  { path: 'Dashboard', loadChildren: () => 
                import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) }, 

  { path: 'Navbar', loadChildren: () => 
                import('./components/SharedComponents/navbar/navbar.module').then(m => m.NavbarModule)},
  
  { path: 'Sidebar', loadChildren: () => 
                import('./components/SharedComponents/sidebar/sidebar.module').then(m => m.SidebarModule)},

  { path: 'AddVisitor', loadChildren: () => 
                import('./components/add-visitor/add-visitor.module').then(m => m.AddVisitorModule) }, 

  { path: 'UpdateVisitor/:id', loadChildren: () => 
                import('./components/update-visitor/update-visitor.module').then(m => m.UpdateVisitorModule) },

  { path: 'ManageVisitor', loadChildren: () => 
                import('./components/manage-visitor/manage-visitor.module').then(m => m.ManageVisitorModule) },

  { path: 'SearchVisitor', loadChildren: () => 
                import('./components/search-visitor/search-visitor.module').then(m => m.SearchVisitorModule) },

  { path: 'SearchVisitorBeetwenDates', loadChildren: () => 
                import('./components/search-visitor-beetwen-dates/search-visitor-beetwen-dates.module').then(m => m.SearchVisitorBeetwenDatesModule) }, 

  { path: 'ChangePassword', loadChildren: () => 
                import('./components/change-password/change-password.module').then(m => m.ChangePasswordModule) }, 

  { path: 'RoleManagement', loadChildren: () => 
                import('./components/role-management/role-management.module').then(m => m.RoleManagementModule) }, 

  { path: 'RoleManagement/AddRole', loadChildren: () => 
                import('./components/role-management/add-role/add-role.module').then(m => m.AddRoleModule) },

  { path: 'RoleManagement/UpdateRole', loadChildren: () => 
                import('./components/role-management/update-role/update-role.module').then(m => m.UpdateRoleModule) },

  { path: 'Home', loadChildren: () => 
                import('./components/home/home.module').then(m => m.HomeModule) },

  { path: 'Registration', loadChildren: () => 
                import('./components/registration/registration.module').then(m => m.RegistrationModule) },

  { path:'Login',component:LoginComponent},

  { path:'**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
