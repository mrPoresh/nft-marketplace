import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-mint-eth',
  templateUrl: './mint-eth.component.html',
  styleUrls: ['./mint-eth.component.scss']
})
export class MintEthComponent extends BasePageComponent implements OnInit {

  public chainOptions = [
    { icon: 'assets/test/single.png', name: 'erc-721', des: 'If you want to highlight the uniqueness and individuality of your item' },
    { icon: 'assets/test/mult.png', name: 'erc-1155', des: 'If you want to share your NFT with a large number of community members' },
  ];

  constructor(
    public router: Router
  ) {
    super()
  }

  ngOnInit() {

  }

  navigate(option) {
    this.router.navigate(['/create/' + option.name]);
  }

}
