import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-mint-start',
  templateUrl: './mint-start.component.html',
  styleUrls: ['./mint-start.component.scss']
})
export class MintStartComponent extends BasePageComponent implements OnInit {

  public chainOptions = [
    { icon: 'assets/test/eth_L.svg', name: 'ethereum' },
    { icon: 'assets/test/solana.svg', name: 'solana' },
    { icon: 'assets/test/tezos.svg', name: 'tezos' },
    { icon: 'assets/test/flow.svg', name: 'flow' },
    { icon: 'assets/test/polygon.svg', name: 'polygon' },
  ];

  constructor(
    public router: Router,
  ) {
    super()
  }

  ngOnInit() {

  }

  navigate(option) {
    this.router.navigate(['/create/start/' + option.name]);
  }

}
