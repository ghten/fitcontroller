import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { RestorePasswordComponent } from './restore-password.component';

export const routes = [
  { path: '', component: RestorePasswordComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    RestorePasswordComponent
  ]
})
export class RestorePasswordModule { }