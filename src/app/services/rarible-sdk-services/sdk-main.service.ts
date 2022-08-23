import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, map } from 'rxjs';

import Web3 from "web3"
import { createRaribleSdk } from "@rarible/sdk"

import { toUnionAddress } from "@rarible/types"
import type { 
  GetCollectionByIdRequest, 
  GetAllCollectionsRequest, 
  GetCollectionsByOwnerRequest,
  GetAllItemsRequest,
  GetItemByIdRequest,
  CheckItemRestrictionRequest,
  GetItemRoyaltiesByIdRequest,
  GetItemsByCollectionRequest,
  GetItemsByCreatorRequest,
  GetItemsByOwnerRequest,
  GetOrderBidsByItemRequest,
  GetOrderByIdRequest,
  GetOrdersAllRequest,
  GetSellOrdersRequest,
  GetSellOrdersByItemRequest,
  GetSellOrdersByMakerRequest,
} from "@rarible/api-client/build/apis"
import type { RestrictionCheckForm } from "@rarible/api-client/build/models";
import { Blockchain, OrderStatus } from "@rarible/api-client/build/models";
import { IRaribleSdk } from '@rarible/sdk/build/domain';

import { WindowProviderService } from 'src/app/utils/window-provider.service';

/* Root Service for: Initial SDK with or without provider's */

@Injectable({
  providedIn: 'root'
})
export class SDKMain {

  public raribleSdk: IRaribleSdk; 


  constructor(
    public winRef: WindowProviderService,
  ) {
    this.raribleSdk = createRaribleSdk(undefined, "prod");
    console.log("Connecting SDK without provider");
  }

  initSDKwithProvider(provider: any) {
    this.raribleSdk = createRaribleSdk(provider, "prod");
    console.log("Connecting SDK with provider");
  }

  /* ++++++++++ Collection Flow ++++++++++ */

  getMixCollections() {
    const options: GetAllCollectionsRequest = {
      blockchains: [Blockchain.ETHEREUM],
      continuation: undefined,
      size: 10,
    }
    return from(this.raribleSdk.apis.collection.getAllCollections(options))
  }

  getCollectionById(address: any) {
    const options: GetCollectionByIdRequest = {
      collection: address
    }
    return from(this.raribleSdk.apis.collection.getCollectionById(options));
  }

  getCollectionsByOwner(owner: any) {
    const options: GetCollectionsByOwnerRequest = {
      owner: owner,
      continuation: undefined,
      size: undefined,
    }
    return from(this.raribleSdk.apis.collection.getCollectionsByOwner(options));
  }

/*   refreshCollectionMetaData(address: any) {
    const options: RefreshCollectionMetaRequest = {
      collection: address,
    }
    return from(this.raribleSdk.apis.collection.refreshCollectionMeta(options))
  } */

  /* ++++++++++ Item Flow ++++++++++ */

  getMixItems() {
    const options: GetAllItemsRequest = {
      blockchains: [Blockchain.ETHEREUM],
      continuation: undefined,
      size: 100,
      showDeleted: false,
      lastUpdatedFrom: undefined,
      lastUpdatedTo: undefined,
    }
    return from(this.raribleSdk.apis.item.getAllItems(options))
  }

  getItemById(address: any) {
    const options: GetItemByIdRequest = {
      itemId: address,
    }
    return from(this.raribleSdk.apis.item.getItemById(options));
  }

  checkItemRestriction(address: string, owner: any) {
    const options: CheckItemRestrictionRequest = {
      itemId: address,
      restrictionCheckForm : {
        "@type": "OWNERSHIP",
        user: toUnionAddress(owner),
      }
    }
    return from(this.raribleSdk.apis.item.checkItemRestriction(options));
  }

  getItemRoyaltiesById(address: string) {
    const options: GetItemRoyaltiesByIdRequest = {
      itemId: address
    }
    return from(this.raribleSdk.apis.item.getItemRoyaltiesById(options));
  }

  getItemsByCollection(address: string, size: number) {
    const options: GetItemsByCollectionRequest = {
      collection: address,
      size: size,
    }
    return from(this.raribleSdk.apis.item.getItemsByCollection(options))
  }

  getItemsByCollections(options) {
    const data: Observable<any>[] = [];
    options.forEach((item) => {
      data.push(this.getItemsByCollection(item.address, item.size).pipe(
        map((res) => res.items)
      ));
    });

    return forkJoin(data);
  }

  getItemsByCreator(address: string) {
    const options: GetItemsByCreatorRequest = {
      creator: address,
    }
    return from(this.raribleSdk.apis.item.getItemsByCreator(options));
  }

  getItemsByOwner(address: string) {
    const options: GetItemsByOwnerRequest = {
      owner: address,
    }
    return from(this.raribleSdk.apis.item.getItemsByOwner(options));
  }

  /* ++++++++++ OrderControllerApi ++++++++++ */

  getOrderBidsByItem(address: string) {
    const options: GetOrderBidsByItemRequest = {
      itemId: address,
      status: [OrderStatus.ACTIVE],
      /* other params */
    }
    return from(this.raribleSdk.apis.order.getOrderBidsByItem(options));
  }

  getOrderById(address: string) {
    const options: GetOrderByIdRequest = {
      id: address,
    }
    return from(this.raribleSdk.apis.order.getOrderById(options));
  }

  getOrdersAll() {
    const options: GetOrdersAllRequest = {
      blockchains: [Blockchain.ETHEREUM],
      status: [OrderStatus.ACTIVE],
      size: 100,
    }
    return from(this.raribleSdk.apis.order.getOrdersAll(options));
  }

  /* getOrdersByIds */

  getSellOrders() {
    const options: GetSellOrdersRequest = {
      blockchains: [Blockchain.ETHEREUM],
      size: 50,
    }
    return from(this.raribleSdk.apis.order.getSellOrders(options));
  }

  getSellOrdersByItem(address: string) {
    const options: GetSellOrdersByItemRequest = {
      itemId: address,
      status: [OrderStatus.ACTIVE],
    }
    return from(this.raribleSdk.apis.order.getSellOrdersByItem(options));
  }

  getSellOrdersByMaker(address: string) {
    const options: GetSellOrdersByMakerRequest = {
      maker: address,
    }
    return from(this.raribleSdk.apis.order.getSellOrdersByMaker(options));
  }

  /* Get Balance */

  getBalance(owner: any) {
    return from(this.raribleSdk.balances.getBalance(toUnionAddress(owner), {"@type": "ETH"}));
  }

  
}
