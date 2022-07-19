import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectWalletMainComponent } from './connect-wallet-main/connect-wallet-main.component';

const routes: Routes = [
  { path: '', component: ConnectWalletMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectWalletRoutingModule { }
