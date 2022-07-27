import { Component, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { DetectDeviceService } from './utils/detect-device.service';
import { LoginStatusService } from './services/auth/login-status.service';

import { topMenuAction } from './components/base-components/slide-menu/slide-menu-button/slide-menu-button.component';
import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { LoggedStatus } from './services/auth/login.models';
/* import { AlchemyMainService } from './services/alchemy/alchemy-main.service'; */



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BasePageComponent implements OnInit {
  title = 'nft-marketplace';
  /* id = 'ETHEREUM:0x6ede7f3c26975aad32a475e1021d8f6f39c89d82:41256998051628345422135008486692978525895218265513029176440545919372353339397'; */

  public isExtend = false;
  public isDesktop = false;

  public isLogged = false; /* test */
  public accounts: any;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public detectDeviceService: DetectDeviceService,
    public loginStatusService: LoginStatusService,
    /* public alchemy: AlchemyMainService, */
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

/*     this.alchemy.init().then(() => 
      this.alchemy.getBalance().subscribe((res) => console.log("Balance ->", res))
    ); */

  }

  menuAction(value: topMenuAction) {
    if (value === topMenuAction.TOP) {
      this.sidenav.open();
    }
    else if (value === topMenuAction.BACK) {
      this.sidenav.close();
    }
    
  }

  closeFromMenu() {
    this.sidenav.close();
  }

}
