import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';
import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent extends BasePageComponent implements OnInit {

  public _items: any[] = [];

  constructor(
    private router: Router,
    private sdk: SDKMain,
    ) { 
      super() ;
    }

  ngOnInit() {
    this.sdk.getMixItems().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      res.items.forEach((item) => {
        if (item.meta) {
          if (item.meta.content[0]) {
            this._items.push(item);
          }
        }
      });

      console.log('items', this._items)

    });
  }

  onClick(data: any) {
    console.log('Choosed nft >>>', data);
    this.router.navigate(['token' + '/' + data.id]);
  }

}
