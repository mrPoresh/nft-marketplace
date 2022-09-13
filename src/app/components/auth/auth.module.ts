import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';

import { LoginMainComponent } from './login/login-main/login-main.component';
import { LoginComponent } from './login/login/login.component';
import { LoginDialogComponent, LoginDialogRouteComponent } from './login/login-dialog/login-dialog.component';
import { SignupMainComponent } from './signup/signup-main/signup-main.component';
import { SignupDialogComponent, SignupDialogRouteComponent } from './signup/signup-dialog/signup-dialog.component';
import { SignupFormComponent } from './signup/signup-form/signup-form.component';
import { SignupStepOneComponent } from './signup/signup-step-one/signup-step-one.component';
import { SignupStepTwoComponent } from './signup/signup-step-two/signup-step-two.component';
import { SignupStepThreeComponent } from './signup/signup-step-three/signup-step-three.component';
import { LostPasswordMainComponent } from './lost-password/lost-password-main/lost-password-main.component';
import { LostPasswordDialogComponent, LostPasswordDialogRouteComponent } from './lost-password/lost-password-dialog/lost-password-dialog.component';
import { LostPasswordComponent } from './lost-password/lost-password/lost-password.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components/shared-components.module';



@NgModule({
  declarations: [
    LoginMainComponent,
    LoginComponent,
    LoginDialogComponent,
    LoginDialogRouteComponent,
    SignupMainComponent,
    SignupDialogComponent,
    SignupDialogRouteComponent,
    SignupFormComponent,
    SignupStepOneComponent,
    SignupStepTwoComponent,
    SignupStepThreeComponent,
    LostPasswordMainComponent,
    LostPasswordComponent,
    LostPasswordDialogComponent,
    LostPasswordDialogRouteComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
