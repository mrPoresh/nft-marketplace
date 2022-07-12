import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginMainComponent } from './login/login-main/login-main.component';

const routes: Routes = [
  { path: 'login', component: LoginMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
