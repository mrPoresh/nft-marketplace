import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';

import { BasePageComponent } from '../base-components/base-page/base-page.component';
import { NFTsOptions } from 'src/app/services/rarible-sdk-services/sdk-models.models';
import { DetectDeviceService } from 'src/app/utils/detect-device.service';


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


  public isExtend = false;
  public isDesktop = false;

  constructor(
    public route: ActivatedRoute,
    public detectDeviceService: DetectDeviceService, 
    public sdk: SDKMain,
  ) { 
    super();

    this.token_id = this.route.snapshot.params['id'];

  }

  ngOnInit() { 

    this.isDesktop = this.detectDeviceService.isDesktop();

    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    /* console.log('ccc', this.isDesktop); */

/*     if (window.screen.width > 450) {
      this.rowHeight = "10vh";
      this.cols = "8";
    } else {
      this.rowHeight = "60vh";
      this.cols = "1";
    } */

    this.sdk.getItemById(this.token_id).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.nft_data = res;
      this.collection_id = res.collection;

      console.log('NFT Data >>>', this.nft_data);

      this.sdk.getCollectionById(this.collection_id).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
        this.collection_data = res;
        console.log('Collection Data >>>', this.collection_data);
      });

    });

    this.sdk.getOrderBidsByItem(this.token_id).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      console.log('Orders Bids >>>', res);
    });

    this.sdk.getSellOrdersByItem(this.token_id).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      console.log('Sell Orders >>>', res);
    });

  }

}
