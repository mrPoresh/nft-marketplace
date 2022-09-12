import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map, BehaviorSubject } from 'rxjs';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';
import { DetectDeviceService } from 'src/app/utils/detect-device.service';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';
import { NFTsOptions } from 'src/app/services/rarible-sdk-services/sdk-models.models';
import { SdkLoginService } from 'src/app/services/rarible-sdk-services/sdk-login.service';

@Component({
  selector: 'app-asset-page',
  templateUrl: './asset-page.component.html',
  styleUrls: ['./asset-page.component.scss']
})
export class AssetPageComponent extends BasePageComponent implements OnInit {

  public rowHeight!: string;
  public cols!: string;

  panelOpenState = false;

  public token_id!: any;
  public collection_id!: any;

  public nft_data!: any;
  public collection_data!: any;
  public collections_nft!: any;
  public sell_orders!: any[];
  public bid_orders!: any[];

  public isExtend = false;
  public isDesktop = false;
  public isOwner = false;   //

  constructor(
    public route: ActivatedRoute,
    public detectDeviceService: DetectDeviceService, 
    public sdk: SDKMain,
    public loginService: SdkLoginService,
  ) { 
    super();

    this.token_id = this.route.snapshot.params['id'];

  }

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    navigation: true,
    keyboard: true,
  };

  onSlideChange() {
    console.log('slide change');
  }

  ngOnInit() { 

    this.isDesktop = this.detectDeviceService.isDesktop();

    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.loginService.getConnection().subscribe((res) => {
      if (res.status === "connected") {
        console.log("Init Provider with Wallet", res)
        this.sdk.initSDKwithProvider(res.connection.wallet);
      } else {
        console.log("Wait Connection", res);
      }

    });

    this.sdk.getItemById(this.token_id).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.nft_data = res;
      this.collection_id = res.collection;    // remove collection

      console.log('NFT Data >>>', this.nft_data);

      this.sdk.getCollectionById(this.collection_id).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
        this.collection_data = res;
        console.log('Collection Data >>>', this.collection_data);
      });

      this.sdk.getItemsByCollection(this.collection_id, 9).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
        this.collections_nft = res.items;
        console.log('Collections NFT >>>', this.collections_nft);
      });

    });

    this.sdk.getOrderBidsByItem(this.token_id).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.bid_orders = res.orders;
      console.log('Orders Bids >>>', this.bid_orders);
    });

    this.sdk.getSellOrdersByItem(this.token_id).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.sell_orders = res.orders;
      console.log('Sell Orders >>>', this.sell_orders);
    });

  }

  makeBid() {
    this.sdk.makeBid(this.token_id).subscribe((res) => console.log('created bid', res));
  }

  acceptBid() {
    if (this.bid_orders.length > 0) {  // todo: searching highest bid
      this.sdk.acceptBid(this.bid_orders[0].id, this.token_id).subscribe((res) => console.log('accept bid', res));
    }

  }

  sellOrder() {
    this.sdk.sellOrder(this.token_id).subscribe((res) => console.log('sell order', res));
  }

  batchBuy() {
    if (this.sell_orders.length > 0) {
      this.sdk.batchBuy(this.sell_orders[0].id, this.token_id).subscribe((res) => console.log('Batch Buy', res));
    }
  }

}
