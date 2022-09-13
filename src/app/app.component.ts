import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { filter, takeUntil } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { DetectDeviceService } from './utils/detect-device.service';
import { LoginStatusService } from './services/auth/login/login-status.service';

import { topMenuAction } from './components/base-components/slide-menu/slide-menu-button/slide-menu-button.component';
import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { SDKMain } from './services/rarible-sdk-services/sdk-main.service';
import { UserInfo } from './services/auth/login/login.models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BasePageComponent implements OnInit {
  title = 'nft-marketplace';

  public isExtend = false;
  public isDesktop = false;

  public isLogged = false;

  public User!: UserInfo;
  public balance = '';

  @Output() closeEvent = new EventEmitter();

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public detectDeviceService: DetectDeviceService,
    public loginStatusService: LoginStatusService,
    public sdk: SDKMain,
  ) {
    super()
  }

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.isDesktop = this.detectDeviceService.isDesktop();

    this.loginStatusService.getLoginStatus().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      console.log("User Status", res);
      this.User = res;

      if(this.User.isLogged == 1) {
        this.isLogged = true;

        this.sdk.getBalance('ETHEREUM:' + this.User.walletAddress).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
          this.balance = res.toString();
        });
      } else {
        this.isLogged = false;
      }
    });

    this.sdk.initSDKwiithOutProvider()
    
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
