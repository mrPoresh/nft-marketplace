import { Component, OnInit } from '@angular/core';


import { DetectDeviceService } from 'src/app/utils/detect-device.service';
import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { SdkLoginService } from 'src/app/services/rarible-sdk-services/sdk-login.service';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss']
})
export class ConnectWalletComponent extends BasePageComponent implements OnInit {

  isDesktop = false;
  options!: any[];

  constructor(
    public detectDeviceService: DetectDeviceService,
    public winRef: WindowProviderService,
    public loginService: SdkLoginService,
  ) { super() }

  ngOnInit() {
    this.isDesktop = this.detectDeviceService.isDesktop();

    this.loginService.createConnector();
    console.log("Connector in Wallet-Module", this.loginService.getConnector());

    this.loginService.getConenctionOptions().subscribe((res) => {
      this.options = res;
    });
    
  }

  connectMetamask() {
    const option = this.options.find((opt) => {
      return opt.option === 'Metamask'
    });

    if (option) {
      this.loginService.loginWithWallet(option);
    } else {
      this.winRef.window.alert("Please Install Metamask");
    }

  }

  connectWalletConnect() {
    const option = this.options.find((opt) => {
      return opt.option === 'walletconnect'
    });

    if (option) {
      this.loginService.loginWithWallet(option);
    } else {
      this.winRef.window.alert("Bad Way");
    }

  }

  disconect() {
    this.loginService.logOut();
  }

}
