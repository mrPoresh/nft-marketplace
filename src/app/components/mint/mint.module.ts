import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MintRoutingModule } from './mint-routing.module';
import { MintStartComponent } from './mint-start/mint-start.component';
import { MintEthComponent } from './mint-eth/mint-eth.component';
import { MintErc1155Component } from './mint-erc1155/mint-erc1155.component';
import { MintErc721Component } from './mint-erc721/mint-erc721.component';

import { SharedMaterialModule } from 'src/app/modules/shared-material.module';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';
import { SdkLoginService } from 'src/app/services/rarible-sdk-services/sdk-login.service';
import { IpfsDaemonService } from 'src/app/services/ipfs/ipfs-deamon.service';


@NgModule({
  declarations: [
    MintStartComponent,
    MintEthComponent,
    MintErc1155Component,
    MintErc721Component
  ],
  imports: [
    CommonModule,
    MintRoutingModule,
    SharedMaterialModule,
  ], 
  providers : [
    //SDKMain,
    SdkLoginService,
  ]
})
export class MintModule { }
