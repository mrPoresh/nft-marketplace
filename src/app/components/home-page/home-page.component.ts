import { Component, OnInit, Input } from '@angular/core';
import { takeUntil } from 'rxjs';
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

  constructor(
    public detectDeviceService: DetectDeviceService,
    public sdk: SDKMain,
    public router: Router,
  ) { super() }

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.isDesktop = this.detectDeviceService.isDesktop();

    this.sdk.getItemsByCollections(topCollections).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      res.forEach((item, index) => {
        this.sections[index].data = item;
      });

      console.log("Home Page NFT's >>>", this.sections);

    });
    
  }

  onClick(data: any) {
    console.log('Choosed nft >>>', data);
    this.router.navigate(['token' + '/' + data.id]);
  }

}
