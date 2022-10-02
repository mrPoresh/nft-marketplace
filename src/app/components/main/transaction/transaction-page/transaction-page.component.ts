import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';
import { TokenAddressKeeperService } from 'src/app/utils/token-address-keeper.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent extends BasePageComponent implements OnInit {

  token_address = '';
  token_data: any;  //

  constructor(
    private router: Router,
    addressKeeper: TokenAddressKeeperService,
    private sdk: SDKMain,
  ) { 
    super();
    
    addressKeeper.getTokenAddress().pipe(takeUntil(this.unsubscribe)).subscribe((res) => this.token_address = res);
    
  }

  ngOnInit() {
    this.sdk.getItemById(this.token_address).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      console.log('data', res);
      this.token_data = res;
    });
  }

  goHome() {
    this.router.navigate(['/'])
  }

}
