import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import Web3 from "web3"
import { createRaribleSdk } from "@rarible/sdk"

import { toUnionAddress } from "@rarible/types"
import type { 
  GetCollectionByIdRequest, 
  GetAllCollectionsRequest, 
  GetCollectionsByOwnerRequest,
  RefreshCollectionMetaRequest,
  GetAllItemsRequest,
  GetItemByIdRequest,
  GetItemByIdsRequest,
  CheckItemRestrictionRequest,
  GetItemRoyaltiesByIdRequest,
  GetItemsByCollectionRequest,
  GetItemsByCreatorRequest,
  GetItemsByOwnerRequest,
  GetItemsByOwnerWithOwnershipRequest,
  GetOrderBidsByItemRequest,
  GetOrderBidsByMakerRequest,
  GetOrderByIdRequest,
  GetOrdersAllRequest,
  GetSellOrdersRequest,
  GetSellOrdersByItemRequest,
  GetSellOrdersByMakerRequest,
} from "@rarible/api-client/build/apis"
import type { RestrictionCheckForm, ItemIds } from "@rarible/api-client/build/models";
import { Blockchain, OrderStatus } from "@rarible/api-client/build/models";
import { IRaribleSdk } from '@rarible/sdk/build/domain';

import { WindowProviderService } from 'src/app/utils/window-provider.service';

/* Root Service for: Initial SDK with or without provider's */

@Injectable({
  providedIn: 'root'
})
export class RaribleSDKMain {

  public raribleSdk: IRaribleSdk; 
  public web3: Web3;

  ethereum: any;

  constructor(
    public winRef: WindowProviderService,
  ) {
    this.ethereum = winRef.window.ethereum;
    this.raribleSdk = createRaribleSdk(undefined, "prod");
  }

  initWeb3(provider: any | undefined) {
    if (provider) {
      this.web3 = new Web3(provider);
      console.log("Init web3", this.web3);

    }

  }

  initSDKwithProvider(provider: any) {
    this.raribleSdk = createRaribleSdk(provider, "prod");
    console.log("Connected SDK", this.raribleSdk);
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
      blockchains: [Blockchain.ETHEREUM],
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

/*   getItemsByIds(ids: any) {
    const options: GetItemByIdsRequest = {
      itemIds: ids, //  array of ids
    };
    return from(this.raribleSdk.apis.item.getItemByIds(options)); 
  } */

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

  getItemsByCollection(address: string) {
    const options: GetItemsByCollectionRequest = {
      collection: address,
    }
    return from(this.raribleSdk.apis.item.getItemsByCollection(options))
  }

  getItemsByCreator(address: string) {
    const options: GetItemsByCreatorRequest = {
      creator: address,
      blockchains: [Blockchain.ETHEREUM],
    }
    return from(this.raribleSdk.apis.item.getItemsByCreator(options));
  }

  getItemsByOwner(address: string) {
    const options: GetItemsByOwnerRequest = {
      owner: address,
      blockchains: [Blockchain.ETHEREUM],
    }
    return from(this.raribleSdk.apis.item.getItemsByOwner(options));
  }

  getItemsByOwnerWithOwnership(address: string) {
    const options: GetItemsByOwnerWithOwnershipRequest = {
      owner: address
    }
    return from(this.raribleSdk.apis.item.getItemsByOwnerWithOwnership(options))
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

  getOrderBidsByMaker(address: string) {
    const options: GetOrderBidsByMakerRequest = {
      maker: address,
      status: [OrderStatus.ACTIVE],
      /* other params */
    }
    return from(this.raribleSdk.apis.order.getOrderBidsByMaker(options));
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