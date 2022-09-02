import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { filter } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { DetectDeviceService } from './utils/detect-device.service';
import { LoginStatusService } from './services/auth/login/login-status.service';

import { topMenuAction } from './components/base-components/slide-menu/slide-menu-button/slide-menu-button.component';
import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { CheckSessionService } from './services/auth/check-session/check-session.service';


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

  @Output() closeEvent = new EventEmitter();

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public detectDeviceService: DetectDeviceService,
    public loginStatusService: LoginStatusService,
    public checkSessionService: CheckSessionService,
  ) {
    super()
  }

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.isDesktop = this.detectDeviceService.isDesktop();
    console.log('ccc', this.isDesktop);

    this.checkSessionService.requestCheckUserInfo().subscribe((res) => {
      console.log("App Comp", res);
      if (res.isLogged == 1) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
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
