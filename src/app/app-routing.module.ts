import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AuthGuard } from './services/auth.guard'; 
import { DefaultComponent as AdminDefaultComponent } from './admin/layouts/default/default.component';
import { DashboardComponent } from './admin/modules/dashboard/dashboard.component';

import { DefaultComponent as ClientDefaultComponent } from './client/layouts/default/default.component';
import { UserManagementComponent } from './admin/modules/user-management/user-management.component';
import { SettingsComponent } from './admin/modules/settings/settings.component';


const routes: Routes = [
  { path: 'auth/sign-up', component: SignUpComponent },
  { path: 'auth/sign-in', component: SignInComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },

  // Admin route with role-based access control
  {
    path: 'admin', 
    component: AdminDefaultComponent, 
    canActivate: [AuthGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'User_management', component: UserManagementComponent},
      { path: 'Settings', component: SettingsComponent}
    ]
  },

  // Client route with role-based access control
  {
    path: 'client', 
    component: ClientDefaultComponent, 
    canActivate: [AuthGuard]
  },

  // Default route to redirect to sign-in page
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },

  // Wildcard route for handling 404 pages
  { path: '**', redirectTo: 'auth/sign-in' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
