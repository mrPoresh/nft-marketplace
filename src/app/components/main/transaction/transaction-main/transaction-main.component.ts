import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TokenAddressKeeperService } from 'src/app/utils/token-address-keeper.service';

@Component({
  selector: 'app-transaction-main',
  templateUrl: './transaction-main.component.html',
  styleUrls: ['./transaction-main.component.scss']
})
export class TransactionMainComponent implements OnInit {

  public isExtend = false;
  public token_address!: string;

  constructor(
    private route: ActivatedRoute,
    private addressKeeper: TokenAddressKeeperService
  ) {
    this.token_address = this.route.snapshot.params['chain'] + ':' + this.route.snapshot.params['contract'] + ':' + this.route.snapshot.params['id'];

    addressKeeper.updateTokenAddress(this.token_address);
    
  }

  ngOnInit() {
    if (window.screen.width > 650) {
      this.isExtend = true;
    }
    
  }

}
