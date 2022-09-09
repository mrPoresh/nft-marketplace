import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';

import { UserPageComponent } from './user-page/user-page.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components/shared-components.module';


@NgModule({
  declarations: [
    UserPageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
  ]
})
export class UserModule { }
