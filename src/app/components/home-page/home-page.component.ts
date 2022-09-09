import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, fromEvent, Observable, Subscription, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { DetectDeviceService } from 'src/app/utils/detect-device.service';
import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';

import { BasePageComponent } from '../base-components/base-page/base-page.component';
import { topCollections } from 'src/app/services/rarible-sdk-services/sdk-models.models';

export interface Section {
  tag: string,
  data?: any[]
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends BasePageComponent implements OnInit {

  sections: Section[] = [
    { tag: 'New', data: undefined },
    { tag: 'Top', data: undefined },
    { tag: 'Art', data: undefined },
  ];

  isExtend = false;
  isDesktop = false;
  isFull = false;

  cols;
  rowHeight;

  itemsHeight = '2.5';

  constructor(
    public detectDeviceService: DetectDeviceService,
    public sdk: SDKMain,
    public router: Router,
  ) { super() }

  ngOnInit() {
    if (window.innerWidth > 600) {
      this.cols = 2;
      this.rowHeight = '1:1';
      this.itemsHeight = '3'
    } else {
      this.cols = 1;
      this.rowHeight = '3:2';
      this.itemsHeight = '4';
    }

    window.addEventListener('resize', (event) => {
      const w = event.target as Window; 

      if (w.innerWidth > 600) {
        this.cols = 2;
        this.rowHeight = '1:1';
        this.itemsHeight = '2'
      } else {
        this.cols = 1;
        this.rowHeight = '3:2';
        this.itemsHeight = '4';
      }

    });

    this.isDesktop = this.detectDeviceService.isDesktop();

    this.sdk.getItemsByCollections(topCollections).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      res.forEach((item, index) => {
        this.sections[index].data = item;
      });

      console.log("Home Page NFT's >>>", this.sections);

    });

    console.log("SDK 1", this.sdk.raribleSdk);
    
  }

  onClick(data: any) {
    console.log('Choosed nft >>>', data);
    this.router.navigate(['token' + '/' + data.id]);
  }

}
