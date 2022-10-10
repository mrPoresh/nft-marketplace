import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, takeUntil, throwError } from 'rxjs';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';
import { TokenAddressKeeperService, UrlData } from 'src/app/utils/token-address-keeper.service';
import { BaseHttpService, TEST_TRANS_API, GET_TRANS, UPDATE_TRANS } from 'src/app/services/http/base-http.service';
import { BaseTransService } from 'src/app/services/http/base-trans.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent extends BasePageComponent implements OnInit {

  token_data: any;
  trans_data: any;
  token_address!: UrlData;

  constructor(
    private router: Router,
    addressKeeper: TokenAddressKeeperService,
    private http: BaseHttpService,
  ) { 
    super();
    
    addressKeeper.getTokenAddress().pipe(takeUntil(this.unsubscribe)).subscribe((res) => this.token_address = res);
    
  }

  ngOnInit() {
    this.http.getRequestParam<any>(GET_TRANS, [{'id': this.token_address.token_id}]).subscribe((res) => {
      console.log('init trans data', res);
      this.trans_data = res
    });
  }

  confirmPayment() {
    let params = [{'id': this.token_address.token_id}, {'status': 'CONFIRM'}];

    this.http.getRequestParam<any>(UPDATE_TRANS, params).subscribe((res) => {
      console.log('updated trans data', res);
      this.trans_data = res;
    });
  }

}
