import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { RoleGuard } from './../../guards/role.guard';

export const routes = [
  {
      path: '', 
      component: ProfileComponent,
      children:[
        { path: '', redirectTo: 'projects', pathMatch: 'full'},
        { path: 'projects', component: ProjectsComponent, data: { breadcrumb: 'Projects' } },
        { path: 'user-info', component: UserInfoComponent, canActivate: [RoleGuard], data: { role: 'user' } },
        { path: 'change-password', component: ResetPasswordComponent },
      ]
  }
];

@NgModule({
  declarations: [
    ProfileComponent, 
    ProjectsComponent, 
    UserInfoComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
