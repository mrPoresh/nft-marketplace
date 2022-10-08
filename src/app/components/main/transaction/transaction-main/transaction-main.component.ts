import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TokenAddressKeeperService, UrlData } from 'src/app/utils/token-address-keeper.service';

@Component({
  selector: 'app-transaction-main',
  templateUrl: './transaction-main.component.html',
  styleUrls: ['./transaction-main.component.scss']
})
export class TransactionMainComponent implements OnInit {

  public isExtend = false;

  public token_address!: UrlData

  constructor(
    private route: ActivatedRoute,
    private addressKeeper: TokenAddressKeeperService
  ) {

    this.token_address = {
      token_adr: this.route.snapshot.params['chain'] + ':' + this.route.snapshot.params['contract'] + ':' + this.route.snapshot.params['id'],
      token_id: this.route.snapshot.params['id'],
      contract_adr: this.route.snapshot.params['contract'],
    }

    addressKeeper.updateTokenAddress(this.token_address);
    
  }

  ngOnInit() {
    if (window.screen.width > 650) {
      this.isExtend = true;
    }
    
  }

}
