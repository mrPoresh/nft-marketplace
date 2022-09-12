import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, fromEvent, Observable, Subscription, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';
import { topCollections, promotedNFT } from 'src/app/services/rarible-sdk-services/sdk-models.models';

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

  _promotedNFT: any | undefined = undefined;

  isFull = false;

  constructor(
    public sdk: SDKMain,
    public router: Router,
  ) { super() }

  ngOnInit() {

    this.sdk.getItemsByCollections(topCollections).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      res.forEach((item, index) => {
        this.sections[index].data = item;
      });

      console.log("Home Page NFT's >>>", this.sections);

    });

    this.sdk.getItemById(promotedNFT.address).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this._promotedNFT = res;
      console.log("pr", this._promotedNFT)
    });
    
  }

  onClick(data: any) {
    console.log('Choosed nft >>>', data);
    this.router.navigate(['token' + '/' + data.id]);
  }

}
