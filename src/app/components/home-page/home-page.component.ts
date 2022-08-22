import { Component, OnInit, Input } from '@angular/core';
import { takeUntil } from 'rxjs';

import { DetectDeviceService } from 'src/app/utils/detect-device.service';
import { RaribleSDKMain } from 'src/app/services/rarible-sdk-services/rarible-sdk-main.service';

import { BasePageComponent } from '../base-components/base-page/base-page.component';

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

  topCollections = [  /* time solution */
    { address: 'ETHEREUM:0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', size: 6 },
    { address: 'ETHEREUM:0x209e639a0ec166ac7a1a4ba41968fa967db30221', size: 6 },
    { address: 'ETHEREUM:0x39ee2c7b3cb80254225884ca001f57118c8f21b6', size: 6 },
  ];

  isExtend = false;
  isDesktop = false;

  constructor(
    public detectDeviceService: DetectDeviceService,
    public sdk: RaribleSDKMain,
  ) { super() }

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.isDesktop = this.detectDeviceService.isDesktop();

    this.sdk.getItemsByCollections(this.topCollections).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      res.forEach((item, index) => {
        this.sections[index].data = item;
      });

      console.log("Home Page NFT's >>>", this.sections);

    });
    
  }

}
