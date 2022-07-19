import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectWalletRoutingModule } from './connect-wallet-routing.module';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';

import { ConnectWalletMainComponent } from './connect-wallet-main/connect-wallet-main.component';
import { ConnectWalletDialogComponent, ConnectWalletDialogRouteComponent } from './connect-wallet-dialog/connect-wallet-dialog.component';
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';


@NgModule({
  declarations: [
    ConnectWalletMainComponent,
    ConnectWalletDialogComponent,
    ConnectWalletDialogRouteComponent,
    ConnectWalletComponent,
  ],
  imports: [
    CommonModule,
    ConnectWalletRoutingModule,
    SharedMaterialModule,
  ]
})
export class ConnectWalletModule { }
