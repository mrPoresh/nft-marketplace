import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginMainComponent } from './login/login-main/login-main.component';
import { LostPasswordMainComponent } from './lost-password/lost-password-main/lost-password-main.component';
import { SignupMainComponent } from './signup/signup-main/signup-main.component';

const routes: Routes = [
  { path: 'login', component: LoginMainComponent },
  { path: 'signup', component: SignupMainComponent },
  { path: 'lost-password', component: LostPasswordMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
