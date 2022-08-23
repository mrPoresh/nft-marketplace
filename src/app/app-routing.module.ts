import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { AssetPageComponent } from './components/asset-page/asset-page.component';
import { CollectionPageComponent } from './components/collection-page/collection-page.component';
import { ExploreCollectionsComponent } from './components/explore-collections/explore-collections.component';

/* const authRoute = {
  path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
} */

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'explore-collections', component: ExploreCollectionsComponent },
  { path: 'collection/:name/:address', component: CollectionPageComponent },
  { path: 'token/:id', component: AssetPageComponent },
  { path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'connect-wallet', loadChildren: () => import('./components/connect-wallet/connect-wallet.module').then(m => m.ConnectWalletModule) },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
