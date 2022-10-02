import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedComponentsModule } from 'src/app/modules/shared-components/shared-components.module';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';

import { AssetPageComponent } from './asset-page/asset-page.component';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ExploreComponent } from './explore/explore.component';
import { AssetsComponent } from './explore/assets/assets.component';
import { CollectionsComponent } from './explore/collections/collections.component';
import { TransactionMainComponent } from './transaction/transaction-main/transaction-main.component';
import { TransactionPageComponent } from './transaction/transaction-page/transaction-page.component';
import { TransactionDialogComponent, TransactionDialogRouteComponent } from './transaction/transaction-dialog/transaction-dialog.component';

import { TokenAddressKeeperService } from 'src/app/utils/token-address-keeper.service';


@NgModule({
  declarations: [
    AssetPageComponent,
    CollectionPageComponent,
    HomePageComponent,
    ExploreComponent,
    AssetsComponent,
    CollectionsComponent,
    TransactionMainComponent,
    TransactionPageComponent,
    TransactionDialogComponent,
    TransactionDialogRouteComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedComponentsModule,
    SharedMaterialModule,
  ],
  providers: [
    TokenAddressKeeperService,
  ]
})
export class MainModule { }
