import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';

import { LoginMainComponent } from './login/login-main/login-main.component';
import { LoginComponent } from './login/login/login.component';
import { LoginDialogComponent, LoginDialogRouteComponent } from './login/login-dialog/login-dialog.component';


@NgModule({
  declarations: [
    LoginMainComponent,
    LoginComponent,
    LoginDialogComponent,
    LoginDialogRouteComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
