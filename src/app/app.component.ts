import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { filter } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { DetectDeviceService } from './utils/detect-device.service';
import { LoginStatusService } from './services/auth/login/login-status.service';

import { topMenuAction } from './components/base-components/slide-menu/slide-menu-button/slide-menu-button.component';
import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { LoggedStatus } from './services/auth/login/login.models';
import { RaribleSDKMain } from './services/rarible-sdk-services/rarible-sdk-main.service';
import { CheckSessionService } from './services/auth/check-session/check-session.service';


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
    public sdk: RaribleSDKMain,
    public checkSessionService: CheckSessionService,
  ) {
    super()
  }

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.isDesktop = this.detectDeviceService.isDesktop();

    this.checkSessionService.requestCheckUserInfo().subscribe((res) => console.log("App Comp", res));

    this.sdk.getItemsByOwner(this.randomNFTboy).subscribe((res) => console.log("res", res))
    
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
