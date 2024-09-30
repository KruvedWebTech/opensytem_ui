import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserManagementComponent } from '../../modules/user-management/user-management.component';
import { SettingsComponent } from '../../modules/settings/settings.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    UserManagementComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class DefaultModule { }
