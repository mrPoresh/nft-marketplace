import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';
import { TokenAddressKeeperService, UrlData } from 'src/app/utils/token-address-keeper.service';
import { BaseHttpService, TEST_TRANS_API, GET_TRANS } from 'src/app/services/http/base-http.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent extends BasePageComponent implements OnInit {

  token_data: any;
  trans_data: any;
  token_address!: UrlData;

  constructor(
    private router: Router,
    addressKeeper: TokenAddressKeeperService,
    private sdk: SDKMain,
    private http: BaseHttpService,
  ) { 
    super();
    
    addressKeeper.getTokenAddress().pipe(takeUntil(this.unsubscribe)).subscribe((res) => this.token_address = res);
    
  }

  ngOnInit() {
    this.sdk.getItemById(this.token_address.token_adr).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      console.log('token data', res);
      this.token_data = res;
    });

    this.http.getRequestParam<any>(GET_TRANS, 'id', this.token_address.token_id).subscribe((res) => {
      console.log('trans data', res);
      this.trans_data = res
    });
  }

  goHome() {
    this.router.navigate(['/'])
  }

}
