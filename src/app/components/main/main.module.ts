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
import { PaymentPageComponent } from './payment-page/payment-page/payment-page.component';
import { PaymentMainComponent } from './payment-page/payment-main/payment-main.component';
import { PaymentDialogComponent, PaymentDialogRouteComponent } from './payment-page/payment-dialog/payment-dialog.component';


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
    TransactionDialogRouteComponent,
    PaymentPageComponent,
    PaymentMainComponent,
    PaymentDialogComponent,
    PaymentDialogRouteComponent
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
