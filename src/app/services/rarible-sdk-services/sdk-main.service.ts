import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, map, switchMap } from 'rxjs';

import { createRaribleSdk } from "@rarible/sdk"

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

import { toCollectionId, toUnionAddress, toItemId, toOrderId, toContractAddress } from "@rarible/types"
import { Blockchain, OrderStatus } from "@rarible/api-client/build/models";
import { IRaribleSdk } from '@rarible/sdk/build/domain';

import { FillRequest } from '@rarible/sdk/build/types/order/fill/domain';
import { BatchFillRequest } from '@rarible/sdk/build/types/order/fill/domain';

import { CreateCollectionRequest } from '@rarible/sdk/build/types/nft/deploy/domain';
import { EthEthereumAssetType } from '@rarible/api-client/build/models/AssetType';

import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { RARIBLE_ERC_1155 } from './sdk-models.models';

/* Root Service for: Initial SDK with or without provider's */

@Injectable({
  providedIn: 'root'
})
export class SDKMain {

  public raribleSdk!: IRaribleSdk; 


  constructor(

  ) {
    
  }
  

  initSDKwithProvider(provider: any) {
    this.raribleSdk = createRaribleSdk(provider, "prod");
    console.log("Connecting SDK with provider", this.raribleSdk);
  }

  initSDKwiithOutProvider() {
    this.raribleSdk = createRaribleSdk(undefined, "prod");
    console.log("Connecting SDK without provider");
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
      maker: [address],
    }
    return from(this.raribleSdk.apis.order.getSellOrdersByMaker(options));
  }

  /* Get Balance */

  getBalance(owner: any) {
    return from(this.raribleSdk.balances.getBalance(toUnionAddress(owner), {"@type": "ETH"}));
  }

  /* Create Collection */

  createCollection(asset) {
    const collectionReq: CreateCollectionRequest = {
      blockchain: Blockchain.ETHEREUM,
      asset: asset,
    };
    console.log("Here", this.raribleSdk)
    return from(this.raribleSdk.nft.createCollection(collectionReq).then((res) => {
      return res.tx.wait()
    }));
  }

  /* mint and sell */   /* work */

  mintOffChain(uri: string, user_address: string) {
    console.log("uri", uri);
    console.log("owner", user_address);
    return from(this.raribleSdk.nft.mintAndSell({collectionId: toCollectionId(RARIBLE_ERC_1155)})).pipe(
      switchMap((res) => res.submit({
        uri: uri,
        royalties: [{                           // For marketplace
          account: toUnionAddress(user_address),
          value: 1000, //1%
        }],
        creators: [{
          account: toUnionAddress(user_address),
          value: 10000,
        }],
        lazyMint: false,   // 
        supply: 1,  // amount
        price: "0.000000000000000001",
        currency: {
          "@type": "ETH",
          blockchain: Blockchain.ETHEREUM
        }
      }))
    );
  }

  /* make bid */  ////

  makeBid(item_id: string) {    /* problem */
    return from(this.raribleSdk.order.bid({itemId: toItemId(item_id)})).pipe(
      switchMap((res) => res.submit({
        amount: 1,
        price: 0.0009,
        currency: {
          "@type": "ETH",
          blockchain: Blockchain.ETHEREUM,
        },
        expirationDate: new Date(Date.now() + 60 * 60 * 1000), // 1h
      }))
    );
  }

  /* For Owner */

  acceptBid(order_id: any, item_id: string) {   /* work */
    return from(this.raribleSdk.order.acceptBid({orderId: toOrderId(order_id)})).pipe(
      switchMap((res) => res.submit({
        amount: 1,                                  /* originFees: [{}] comision */
        itemId: toItemId(item_id),                 /* payouts: [{}] for users etc. */
        maxFeesBasePoint: 0.00000001, // ?
        unwrap: false,
      }))
    );
  }

/*   bidUpdate() {
    return from(this.raribleSdk.order.bidUpdate)
  } */

/*   cancel() {
    return from(this.raribleSdk.order.cancel)
  } */

  sellOrder(item_id: string) {    /* work */
    return from(this.raribleSdk.order.sell({itemId: toItemId(item_id)})).pipe(
      switchMap((res) => res.submit({
        amount: 1,
        price: 0.0003,
        currency: {
          "@type": "ETH",
          blockchain: Blockchain.ETHEREUM,
        },
        expirationDate: new Date(Date.now() + 60 * 60 * 1000), // 1h
      }))
    );
  }

/*   sellUpdate() {
    return from(this.raribleSdk.order.sellUpdate)
  } */

  /* accept sell order */

  buy(order_Id: any, item_id: string) {
    return from(this.raribleSdk.order.buy({orderId: toOrderId(order_Id)})).pipe(
      switchMap((res) => res.submit({
        amount: 1,                                  // originFees: [{}] comision
        itemId: toItemId(item_id),                  // payouts: [{}] for users etc.
        maxFeesBasePoint: 0.00000001, // ?
        unwrap: false,
      }))
    );
  }

  /* buy array of nfts */

  batchBuy(order_Id: any, item_id: string) {  //  work
    return from(this.raribleSdk.order.batchBuy([{orderId: toOrderId(order_Id)}])).pipe(
      switchMap((res) => res.submit([
        {
          orderId: toOrderId(order_Id),
          amount: 1,                                  // originFees: [{}] comision
          itemId: toItemId(item_id),                  // payouts: [{}] for users etc.
          maxFeesBasePoint: 0.00000001, // ?
          unwrap: false,
        }
      ]))      
    );
  }
  
}


/* 
itemId: "ETHEREUM:0xb66a603f4cfe17e3d27b87a8bfcad319856518b8:32732219796309672973343588065663301492452635763346005025400213295116463374337"
orderId: "ETHEREUM:0xd88924233df89abfb2524c9dbade975263efde49a371ce184c33648ee771c589"
type: "off-chain" 
*/

/* 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619 - wETH contract adr */
