import { Component, OnInit } from '@angular/core';


import { DetectDeviceService } from 'src/app/utils/detect-device.service';
import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { SdkLoginService } from 'src/app/services/rarible-sdk-services/sdk-login.service';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss']
})
export class ConnectWalletComponent implements OnInit {

  isDesktop = false;
  options!: any[];

  constructor(
    public detectDeviceService: DetectDeviceService,
    public winRef: WindowProviderService,
    public loginSDK: SdkLoginService,
  ) { }

  ngOnInit() {
    this.isDesktop = this.detectDeviceService.isDesktop();

    this.loginSDK.getConenctionOptions().subscribe((res) => {
      this.options = res;
      console.log("Connect Options ->", this.options);
    });

    this.loginSDK.connector.connection.subscribe((res) => {
      console.log("Status in Component >>>", res);

      if (res.status == "connected") {
        console.log("Redy to work");
        this.loginSDK.getBalance("ETHEREUM:" + res.connection.address).subscribe((res) => console.log("Balance >>>", res.toString()));
      } else {
        console.log("Stand By")
      }
    })
    
  }

  connectMetamask() {
    const option = this.options.find((opt) => {
      return opt.option === 'Metamask'
    });

    if (option) {
      this.loginSDK.loginWithWallet(option);
    } else {
      this.winRef.window.alert("Please Install Metamask");
    }

  }

  connectWalletConnect() {
    const option = this.options.find((opt) => {
      return opt.option === 'walletconnect'
    });

    if (option) {
      this.loginSDK.loginWithWallet(option);
    } else {
      this.winRef.window.alert("Bad Way");
    }

  }

  disconect() {
    this.loginSDK.logOut()
  }

}
