import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* const authRoute = {
  path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
} */

const routes: Routes = [

  { path: '', loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)},   // main

  { path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },  //  auth
  { path: 'connect-wallet', loadChildren: () => import('./components/connect-wallet/connect-wallet.module').then(m => m.ConnectWalletModule) }, //  wallet
  { path: 'account/:id', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) }, //  user
  { path: 'create', loadChildren: () => import('./components/mint/mint.module').then(m => m.MintModule) },  //  mint

  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
