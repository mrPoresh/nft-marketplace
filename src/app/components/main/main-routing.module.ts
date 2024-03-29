import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { AssetPageComponent } from './asset-page/asset-page.component';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { ExploreComponent } from './explore/explore.component';
import { AssetsComponent } from './explore/assets/assets.component';
import { CollectionsComponent } from './explore/collections/collections.component';
import { TransactionMainComponent } from './transaction/transaction-main/transaction-main.component';
import { PaymentMainComponent } from './payment-page/payment-main/payment-main.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'collection/:id', component: CollectionPageComponent },
  { path: 'token/:id', component: AssetPageComponent },
  { path: 'explore', component: ExploreComponent, children: 
    [
      { path: 'items', component: AssetsComponent },
      { path: 'collections', component: CollectionsComponent },
    ]
  },
  { path: 'transaction/:chain/:contract/:id', component: TransactionMainComponent },
  { path: 'payment/:contract/:id', component: PaymentMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
