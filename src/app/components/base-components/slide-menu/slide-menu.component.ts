import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { CheckSessionService } from 'src/app/services/auth/check-session/check-session.service';

import { BasePageComponentWithDialogs } from '../base-page/base-page.component';
import { ExploreMenuAction } from './explore-menu/explore-menu-button/explore-menu-button.component';

import { UserInfo } from 'src/app/services/auth/login/login.models';

import { LoginStatusService } from 'src/app/services/auth/login/login-status.service';
import { SdkLoginService } from 'src/app/services/rarible-sdk-services/sdk-login.service';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent extends BasePageComponentWithDialogs implements OnInit {

  User!: UserInfo;

  public isLogged = false;

  @Output() closeEvent = new EventEmitter();

  @ViewChild('sidenavDeep') sidenavDeep!: MatSidenav;

  constructor(
    public errorDialog: MatDialog,
    public checkSessionService: CheckSessionService,
    public loginStatusService: LoginStatusService,
    public loginService: SdkLoginService,
    public router: Router,
  ) { super(errorDialog) }

  ngOnInit() {
    this.checkSessionService.getState().subscribe((res: any) => {
      this.User = res;

      if(this.User.isLogged == 1) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }

    });
  }

  menuAction(value: ExploreMenuAction) {
    console.log("Value", value)
    if (value === ExploreMenuAction.TOP) {
      this.sidenavDeep.open();
    }
    else if (value === ExploreMenuAction.BACK) {
      this.sidenavDeep.close();
    }
    
  }

  close() {
    this.sidenavDeep.close();
  }

  callLinkClickedParent() {
    this.closeEvent.next("");
    if (this.isLogged == false) {
      this.sidenavDeep.close();
    }
  }

  navigateAccount() {
    if (this.User.isLogged == 1) {
      this.router.navigate(['account' + '/' + this.User.walletAddress]);
    }
  
  }

  navigateCreate() {
    if (this.User.isLogged == 1) {
      this.router.navigate(['create']);
    }

  }

  logOut() {
    this.loginService.logOut();
  }

}
