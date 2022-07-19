import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';

/* const authRoute = {
  path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
} */

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'connect-wallet', loadChildren: () => import('./components/connect-wallet/connect-wallet.module').then(m => m.ConnectWalletModule) },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
