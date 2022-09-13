import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { DetectDeviceService } from 'src/app/utils/detect-device.service';
import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { SdkLoginService } from 'src/app/services/rarible-sdk-services/sdk-login.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';
import { LoginStatusService } from 'src/app/services/auth/login/login-status.service';
import { LoggedStatus } from 'src/app/services/auth/login/login.models';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss']
})
export class ConnectWalletComponent extends BasePageComponent implements OnInit {

  isDesktop = false;
  options!: any[];

  @Output() closeEvent = new EventEmitter<string>();

  constructor(
    public detectDeviceService: DetectDeviceService,
    public winRef: WindowProviderService,
    public loginService: SdkLoginService,
    private loginStatusService: LoginStatusService,
    private router: Router,
  ) { super() }

  ngOnInit() {
    this.isDesktop = this.detectDeviceService.isDesktop();

    /* this.loginService.getConenctionOptions().subscribe((res) => {
      this.options = res;
    }); */
    
  }

  async connectMetamask() {
    if (this.winRef.window.ethereum) {
      await this.winRef.window.ethereum.request({ method: "eth_requestAccounts" });
      this.loginService.createConnectorWithMessage();

      this.loginService.getConenctionOptions().subscribe((res) => {
        this.options = res;
  
        const option = this.options.find((opt) => {
          return opt.option === 'Metamask'
        });
    
        if (option) {
          this.loginService.loginWithWallet(option).then(() => {
            this.loginService.getConnection().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
              this.loginStatusService.updateUserInfo({
                isLogged: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
                isLoggedWallet: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
                walletAddress: res.status === "connected" ? res.connection.address : undefined,
              });
            });
          });
        } else {
          this.winRef.window.alert("Please Install Metamask");
        }
  
      });

    } else {
      this.winRef.window.alert("Please Install Metamask");
    }

  }

  connectWalletConnect() {
    this.loginService.createConnectorWithMessage();

    this.loginService.getConenctionOptions().subscribe((res) => {
      this.options = res;

      const option = this.options.find((opt) => {
        return opt.option === 'walletconnect'
      });
  
      if (option) {
        this.loginService.loginWithWallet(option).then(() => {
          this.loginService.getConnection().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
            console.log('con', res)
            this.loginStatusService.updateUserInfo({
              isLogged: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
              isLoggedWallet: res.status === "connected" ? LoggedStatus.logged : LoggedStatus.notLogged,
              walletAddress: res.status === "connected" ? res.connection.address : undefined,
            });

          });
          
        });
      } else {
        this.winRef.window.alert("Please Install Metamask");
      }

    });

  }

  disconect() {
    this.loginService.logOut();
  }

  callLinkClickedParent() {
    this.closeEvent.next("../");
  }

}
