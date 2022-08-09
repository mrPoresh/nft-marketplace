import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { filter } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { DetectDeviceService } from './utils/detect-device.service';
import { LoginStatusService } from './services/auth/login-status.service';

import { topMenuAction } from './components/base-components/slide-menu/slide-menu-button/slide-menu-button.component';
import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { LoggedStatus } from './services/auth/login.models';
import { AlchemyMainService } from './services/alchemy/alchemy-main.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BasePageComponent implements OnInit {
  title = 'nft-marketplace';
  /* id = 'ETHEREUM:0x6ede7f3c26975aad32a475e1021d8f6f39c89d82:41256998051628345422135008486692978525895218265513029176440545919372353339397'; */

  /* test values */

  public collectionTestEthId = 'ETHEREUM:0xed5af388653567af2f388e6224dc7c4b3241c544'  /* Azuki */
  public nftAddressPlusId = 'ETHEREUM:0xed5af388653567af2f388e6224dc7c4b3241c544:6322'; /* Azuki */
  public lastOrder = 'ETHEREUM:0xe13f4f91d67a22abe62ec5dbb57062e1f64224ee6b23259a36751434b86ce122'; /* Azuki (h) */
  public ownerOfnftAddressPlusId = 'ETHEREUM:0xe915bcc9bd87d92d442bde0d2390bff23485dde4';

  public randomNFTboy = 'ETHEREUM:0xd9a3ea0acdb41a12e871482a8eef99a017e38bf4'

  public arrayOfNFTs = [
    'ETHEREUM:0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7:23221', 
    'ETHEREUM:0xed5af388653567af2f388e6224dc7c4b3241c544:6322', 
    'ETHEREUM:0xed5af388653567af2f388e6224dc7c4b3241c544:3703',
    'ETHEREUM:0xed5af388653567af2f388e6224dc7c4b3241c544:6094',
    'ETHEREUM:0xed5af388653567af2f388e6224dc7c4b3241c544:3833',
  ];

  /* ---------- */

  public isExtend = false;
  public isDesktop = false;

  public isLogged = false; /* test */
  public accounts: any;

  @Output() closeEvent = new EventEmitter();

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public detectDeviceService: DetectDeviceService,
    public loginStatusService: LoginStatusService,
    public alchemy: AlchemyMainService,
  ) {
    super()
  }

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.isDesktop = this.detectDeviceService.isDesktop();

    this.loginStatusService.getLoginStatus().pipe(
      filter(status => status.isLogged === LoggedStatus.logged),  //only if logged
    ).subscribe((res) => console.log("User Status ->", res));

    this.alchemy.init().then(() => {
      /* collections */
      this.alchemy.getMixCollections().subscribe((res) => console.log('Get Mix Collections', res));
      this.alchemy.getCollectionById(this.collectionTestEthId).subscribe((res) => console.log('Get Collection By Id', res));
      this.alchemy.getCollectionsByOwner(this.randomNFTboy).subscribe((res) => console.log('Get Collections By User Address', res));
      /* this.alchemy.refreshCollectionMetaData(this.collectionTestEthId).subscribe(() => console.log('Colletion meta Refreshed'));*/

      /* Items */
      this.alchemy.getMixItems().subscribe((res) => console.log('Get Mixed Items', res));
      this.alchemy.getItemById(this.nftAddressPlusId).subscribe((res) => console.log('Get Nft by Id', res));
      /* this.alchemy.getItemsByIds(this.arrayOfNFTs).subscribe((res) => console.log("Get Items By IDs", res)); */
      this.alchemy.checkItemRestriction(this.nftAddressPlusId, this.ownerOfnftAddressPlusId).subscribe((res) => console.log('Get Item Status', res));
      this.alchemy.getItemRoyaltiesById(this.nftAddressPlusId).subscribe((res) => console.log('Royates for NFT', res));
      this.alchemy.getItemsByCollection(this.collectionTestEthId).subscribe((res) => console.log('Items by collection', res));
      this.alchemy.getItemsByCreator(this.randomNFTboy).subscribe((res) => console.log('Items by creator', res));
      this.alchemy.getItemsByOwner(this.randomNFTboy).subscribe((res) => console.log('items by owner', res));
      this.alchemy.getItemsByOwnerWithOwnership(this.randomNFTboy).subscribe((res) => console.log('getItemsByOwnerWithOwnership', res));

      /* Orders */
      this.alchemy.getOrderBidsByItem(this.nftAddressPlusId).subscribe((res) => console.log('getOrderBidsByItem', res));
      this.alchemy.getOrderBidsByMaker(this.ownerOfnftAddressPlusId).subscribe((res) => console.log('getOrderBidsByMaker', res));
      this.alchemy.getOrderById(this.lastOrder).subscribe((res) => console.log('getOrderById', res));
      this.alchemy.getOrdersAll().subscribe((res) => console.log('getOrdersAll', res));
      /* this.alchemy.getOrdersByIds */
      this.alchemy.getSellOrders().subscribe((res) => console.log('getSellOrders', res));
      this.alchemy.getSellOrdersByItem(this.nftAddressPlusId).subscribe((res) => console.log('getSellOrdersByItem', res));
      this.alchemy.getSellOrdersByMaker(this.randomNFTboy).subscribe((res) => console.log('getSellOrdersByMaker', res));
      
    });
    
  }

  /* *----------* Menu Service *----------* */

  menuAction(value: topMenuAction) {
    if (value === topMenuAction.TOP) {
      this.sidenav.open();
    }
    else if (value === topMenuAction.BACK) {
      this.sidenav.close();
    }
    
  }

  /* backDrop() { ?
    console.log("back Drop");
    this.sidenav.close();
  } */

  close() {
    this.sidenav.close();
  }

   /* *-----------------------------------* */

}
